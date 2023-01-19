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

    return mongoose.connection.model('user', UserSchema);
}

const getConferenceModel = function() {
    const ConferenceSchema = conference.create();

    return mongoose.connection.model('conference', ConferenceSchema);
}

const getKeynoteModel = function() {
    const KeynoteSchema = keynote.create();

    return mongoose.connection.model('keynote', KeynoteSchema);
}

const insertBySelf = {};
const deleteBySelf = {};


const insertUser = doc => getUserModel().create(doc);
const insertConference = doc => getConferenceModel().create(doc);
const insertKeynote = doc => getKeynoteModel().create(doc);

const deleteUser = _id => getUserModel().deleteOne({ _id });
const deleteConference = _id => getConferenceModel().deleteOne({ _id });
const deleteKeynote = _id => getKeynoteModel().deleteOne({ _id });

const _insert = function(collection, doc) {
    const inserts = {
        users: insertUser,
        conferences: insertConference,
        keynotes: insertKeynote,
    }

    insertBySelf[collection][`${doc._id}`] = true;

    if (inserts[collection]) inserts[collection](doc);
    else console.error(`Insert for collection "${collection}" does not exist`);
}

const _delete = function(collection, doc) {
    const deletes = {
        users: deleteUser,
        conferences: deleteConference,
        keynotes: deleteKeynote,
    }

    deleteBySelf[collection][`${doc._id}`] = true;

    if (deletes[collection]) deletes[collection](doc);
    else console.error(`Delete for collection "${collection}" does not exist`);
}


const updateDB = function(data) {
    const types = {
        insert: _insert,
        delete: _delete,
    };

    if (types[data.type]) types[data.type](data.collection, data.doc);
    else console.error(`Type does not exist: ${data.type}`);
}


exports.connect = function() {
    return connect()
        .then(() => {
            return {
                subscribe(fn) {
                    mongoose.connection.watch().on('change', data => {
                        const id = data.fullDocument._id;
                        const coll = data.ns.coll;

                        // Make sure we don't catch our own insert
                        if (data.operationType === 'insert' && insertBySelf[coll][id]) {
                            delete insertBySelf[coll][id];
                            return;
                        }

                        // Make sure we don't catch our own delete
                        if (data.operationType === 'delete' && deleteBySelf[coll][id]) {
                            delete deleteBySelf[coll][id];
                            return;
                        }

                        fn(data);
                    });
                },
                publish: updateDB,
            };
        });
}
