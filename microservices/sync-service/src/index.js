const rabbitmq = require('./rabbitmq');

const user = require('./user');
const conference = require('./conference');
const keynote = require('./keynote');

exports.start = function() {
    rabbitmq
        .connect()
        .then(({ publish, subscribe }) => {
            const userPromise = user.watch(data => publish(data));
            const conferencePromise = conference.watch(data => publish(data));
            const keynotePromise = keynote.watch(data => publish(data));

            subscribe(message => {
                console.log(message);
            });

            return Promise
                .all([
                    userPromise,
                    conferencePromise,
                    keynotePromise
                ]); 
        })
        .then(() => console.log('All services started')); 
}
