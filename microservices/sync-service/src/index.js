const rabbitmq = require('./rabbitmq');
const mongodb = require('./mongodb');

const rabbit = {
    isRunning: false,
    publish: null,
    isFlushing: false,
    isConnecting: false,
    queue: [],
};

const mongo = {
    isRunning: false,
    publish: null,
};

const sentBySelf = {};

const msgToDb = function(msg) {
    const data = JSON.parse(msg);

    console.log(`Change from msq queue:`, data);

    if (sentBySelf[data.id]) {
        delete sentBySelf[data.id];
        console.log('Sent by self, ignore…');

        return;
    }

    mongo.publish(data);
};

const flushMsgQueue = function() {
    if (rabbit.isFlushing) return;
    if (rabbit.queue.length === 0) return;
    if (!rabbit.isRunning) return;

    rabbit.isFlushing = true;

    console.log('Flushing queue');

    while (data = rabbit.queue.shift()) {
        console.log(`Change from db:`, data);

        sentBySelf[data.id] = true;

        rabbit.publish(data);
    }

    rabbit.isFlushing = false;
};

const dbToMsg = function(data) {
    rabbit.queue.push(data);

    flushMsgQueue();
};

function debounce(func, timeout = 300){
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const onError = function() {
    rabbit.isRunning = false;
    rabbit.publish = null;
    rabbit.isConnecting = false;

    console.log('RabbitMQ connection was closed, reconnect…');

    startRabbitMQ();
};

const debouncedOnError = debounce(() => onError(), 5000);

const startRabbitMQ = function() {
    if (rabbit.isConnecting && !rabbit.isRunning) return;

    rabbit.isConnecting = true;

    rabbitmq.connect(debouncedOnError)
        .then(({ publish, subscribe }) => {
            rabbit.isRunning = true;
            rabbit.publish = publish;
            rabbit.isConnecting = false;

            subscribe(msgToDb);

            console.log('RabbitMQ queue started');
        })
        .catch(debouncedOnError);
}

const startMongoDB = function() {
    mongodb.connect(() => {
        mongo.isRunning = false;
        mongo.publish = null;

        console.log('MongoDB connection was closed, reconnect…');

        startMongoDB();
    })
        .then(({ publish, subscribe }) => {
            mongo.isRunning = true;
            mongo.publish = publish;

            // TODO: Merge Databases
            // Upsert all changes into RabbitMQ

            subscribe(dbToMsg);

            console.log('MongoDB watcher started');
        })
        .catch(error => {
            console.log(error);

            setTimeout(startMongoDB, 5000);   
        });
}

exports.start = function() {
    startRabbitMQ();
    startMongoDB();
}
