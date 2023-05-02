const rabbitmq = require('./rabbitmq');
const mongodb = require('./mongodb');

const rabbit = {
    isRunning: false,
    publish: null,
    isFlushing: false,
    isConnecting: true,
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
    if (isFlushing) return;
    if (msgQueue.length === 0) return;
    if (!rabbit.isRunning) return;

    rabbit.isFlushing = true;

    console.log('Flushing queue');

    rabbit.queue.forEach(data => {
        console.log(`Change from db:`, data);

        sentBySelf[data.id] = true;

        rabbit.publish(data);
    });

    rabbit.isFlushing = false;
};

const dbToMsg = function(data) {
    rabbit.queue.push(data);

    flushMsgQueue();
};

const startRabbitMQ = function() {
    if (rabbit.isConnecting) return;

    rabbit.isConnecting = true;

    rabbitmq.connect(() => {
        rabbit.isRunning = false;
        rabbit.publish = null;

        console.log('RabbitMQ connection was closed, reconnect…');

        setTimeout(startRabbitMQ, 5000);
    })
        .then(({ publish, subscribe }) => {
            rabbit.isRunning = true;
            rabbit.publish = publish;

            subscribe(msgToDb);

            console.log('RabbitMQ queue started');
        })
        .catch(error => {
            console.log(error);

            setTimeout(startRabbitMQ, 5000);   
        })
        .finally(() => {
            rabbit.isConnecting = false;
        });
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
