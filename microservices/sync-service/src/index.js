const rabbitmq = require('./rabbitmq');

const user = require('./user');
const conference = require('./conference');
const keynote = require('./keynote');

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

        updateDb();
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

const updateDb = function(data) {
    switch (data.collection) {
        case 'users':
            user.receive(data);
            break;
        case 'keynotes':
            keynote.receive(data);
            break;
        case 'conferences':
            conference.receive(data);
            break;
        default:
            break;
    }
};

exports.start = function() {
    rabbitmq
        .connect()
        .then(({ publish, subscribe }) => {
            const dbToMsg = dbToMsgGenerator(publish);
            const msgToDb = msgToDbGenerator(updateDb);

            const userPromise = user.watch(dbToMsg);
            const conferencePromise = conference.watch(dbToMsg);
            const keynotePromise = keynote.watch(dbToMsg);
            subscribe(msgToDb);

            return Promise
                .all([
                    userPromise,
                    conferencePromise,
                    keynotePromise
                ]); 
        })
        .then(() => console.log('All services started')); 
}
