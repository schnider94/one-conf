const rabbitmq = require('./rabbitmq');
const mongodb = require('./mongodb');

const sentBySelf = {};

const msgToDbGenerator = function(updateDb) {
    return msg => {
        const data = JSON.parse(msg);

        console.log(`Change from msq queue:`, data);

        if (sentBySelf[data.id]) {
            delete sentBySelf[data.id];
            console.log('Sent by self, ignore…');

            return;
        }

        updateDb(data);
    }
}

const dbToMsgGenerator = function(publishMsg) {
    return data => {
        console.log(`Change from db:`, data);
        const uniqueId = data._id._data;

        sentBySelf[uniqueId] = true;

        publishMsg({
            id: uniqueId,
            doc: data.fullDocument,
            type: data.operationType,
            collection: data.ns.coll,
        });
    }
}

exports.start = function() {
    const dbPromise = mongodb.connect();
    const rabbitPromise = rabbitmq.connect();

    Promise
        .all([dbPromise, rabbitPromise])
        .then(([mongodb, rabbitmq]) => {
            const dbToMsg = dbToMsgGenerator(rabbitmq.publish);
            const msgToDb = msgToDbGenerator(mongodb.publish);

            rabbitmq.subscribe(msgToDb);
            mongodb.subscribe(dbToMsg);
        })
        .then(() => console.log('All services started'))
        .catch(error => console.error('Errors startgin listeners:', error));
}
