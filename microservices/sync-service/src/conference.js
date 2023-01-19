const { conference } = require('@schnider94/models');
const database = require('@schnider94/database');

const ConferenceSchema = conference.create();
conference.setup(ConferenceSchema);

const connect = function() {
    return new Promise(resolve => {
        database.connect({
            host: process.env.CONFERENCE_DB_HOST,
            username: process.env.CONFERENCE_DB_USERNAME,
            password: process.env.CONFERENCE_DB_PASSWORD,
            callback: resolve,
            single: false,
        });
    })
};


exports.watch = function(executer) {
    return connect()
        .then(connection => {
            return Promise.resolve(connection.model('conference', ConferenceSchema));
        })
        .then(ConferenceModel => {
            ConferenceModel.watch().on('change', executer);
        })
        .catch(error => console.error('Error starting conference watcher', error));
}

exports.receive = function(msg) {
    console.log('Update conferences:', msg);
}
