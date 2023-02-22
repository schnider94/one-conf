const rabbitmq = require('./rabbitmq');
const mongodb = require('./mongodb');

const rabbit = {
    isRunning: false,
    publish: null,
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

const dbToMsg = function(data) {
    console.log(`Change from db:`, data);

    sentBySelf[data.id] = true;

    rabbit.publish(data);
};

const startRabbitMQ = function() {
    rabbitmq.connect(() => {
        rabbit.isRunning = false;
        rabbit.publish = null;

        console.log('RabbitMQ connection was closed, reconnect…');

        startRabbitMQ();
    })
        .then(({ publish, subscribe }) => {
            rabbit.isRunning = true;
            rabbit.publish = publish;

            subscribe(msgToDb);

            console.log('RabbitMQ queue started');
        })
        .catch(() => {
            setTimeout(startRabbitMQ, 5000);   
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

            console.log('MongoDB queue started');
        })
        .catch(() => {
            setTimeout(startMongoDB, 5000);   
        });
}

exports.start = function() {
    startRabbitMQ();
    startMongoDB();
}
