const rabbitmq = require('./rabbitmq');

const user = require('./user');
const conference = require('./conference');
const keynote = require('./keynote');

const msgToDbGenerator = function(updateDb) {
    return data => {
        console.log(`Change from msq queue: ${data}`);

        updateDb(JSON.parse(data));
    }
}


const dbToMsgGenerator = function(publishMsg) {
    return data => {
        console.log(`Change from db: ${data}`);

        publishMsg(data);
    }
}

const updateDb = function({ message }) {
    switch (message.ns.coll) {
        case 'users':
            user.receive({
                doc: message.fullDocumentm,
                operationType: message.type
            });
            break;
        case 'keynotes':
            user.receive({
                doc: message.fullDocumentm,
                operationType: message.type
            });
            break;
        case 'conferences':
            user.receive({
                doc: message.fullDocumentm,
                operationType: message.type
            });
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
