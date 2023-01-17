const user = require('./user');
const conference = require('./conference');
const keynote = require('./keynote');

exports.start = function() {
    const userPromise = user.watch(data => console.log('User: \n', data));
    const conferencePromise = conference.watch(data => console.log('Conference: \n', data));
    const keynotePromise = keynote.watch(data => console.log('Keynote: \n', data));

    Promise.all(() => console.log('All watchers started'));
}
