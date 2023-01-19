const mongoose = require('mongoose');
const { conference, keynote, user } = require('@schnider94/models');
const database = require('@schnider94/database');

const connect = function() {
    return new Promise(resolve => {
        database.connect({
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            callback: resolve,
        });
    });
}

const getUserModel = function() {
    const UserSchema = user.create();
    user.setup(UserSchema);

    return mongoose.connection.model('user', UserSchema);
}

const getConferenceModel = function() {
    const ConferenceSchema = conference.create();
    conference.setup(ConferenceSchema);

    return mongoose.connection.model('conference', ConferenceSchema);
}

const getKeynoteModel = function() {
    const KeynoteSchema = keynote.create();
    keynote.setup(KeynoteSchema);

    return mongoose.connection.model('keynote', KeynoteSchema);
}


exports.connect = function() {
    return connect()
        .then(() => {
            return {
                subscribe(fn) {
                    mongoose.connection.watch(data => {
                        console.log('watch', data);

                        fn(data);
                    });
                },
                publish(data) {
                    console.log('Write to DB:', data);
                },
            };
        });
}
