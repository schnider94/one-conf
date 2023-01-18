const { keynote } = require('@schnider94/models');
const database = require('@schnider94/database');

const KeynoteSchema = keynote.create();
keynote.setup(KeynoteSchema);

const connect = function() {
    return new Promise(resolve => {
        database.connect({
            host: process.env.KEYNOTE_DB_HOST,
            username: process.env.KEYNOTE_DB_USERNAME,
            password: process.env.KEYNOTE_DB_PASSWORD,
            callback: resolve,
            single: false,
        });
    })
};


exports.watch = function(executer) {
    return connect()
        .then(connection => {
            return Promise.resolve(connection.model('keynote', KeynoteSchema));
        })
        .then(KeynoteModel => {
            KeynoteModel.watch().on('change', executer);
        })
        .catch(error => console.error('Error starting keynote watcher', error));
}
