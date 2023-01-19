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

let UserModel;
let ConferenceModel;
let KeynoteModel;

const getUserModel = function() {
    if (UserModel) return UserModel;

    const UserSchema = user.create();
    UserModel = mongoose.connection.model('user', UserSchema);

    return UserModel;
}

const getConferenceModel = function() {
    if (ConferenceModel) return ConferenceModel;

    const ConferenceSchema = conference.create();
    ConferenceModel = mongoose.connection.model('conference', ConferenceSchema);

    return ConferenceModel;
}

const getKeynoteModel = function() {
    if (KeynoteModel) return KeynoteModel;

    const KeynoteSchema = keynote.create();
    KeynoteModel = mongoose.connection.model('keynote', KeynoteSchema);

    return KeynoteModel;
}

const insertBySelf = {
    users: {},
    conferences: {},
    keynotes: {},
};

const deleteBySelf = {
    users: {},
    conferences: {},
    keynotes: {},
};


const insertUser = doc => getUserModel().create(doc);
const insertConference = doc => getConferenceModel().create(doc);
const insertKeynote = doc => getKeynoteModel().create(doc);

const deleteUser = ({ _id }) => getUserModel().deleteOne({ _id });
const deleteConference = ({ _id }) => getConferenceModel().deleteOne({ _id });
const deleteKeynote = ({ _id }) => getKeynoteModel().deleteOne({ _id });

const _insert = function(collection, doc) {
    const inserts = {
        users: insertUser,
        conferences: insertConference,
        keynotes: insertKeynote,
    }

    insertBySelf[collection][doc._id] = true;

    if (inserts[collection]) inserts[collection](doc);
    else console.error(`Insert for collection "${collection}" does not exist`);
}

const _delete = function(collection, doc) {
    const deletes = {
        users: deleteUser,
        conferences: deleteConference,
        keynotes: deleteKeynote,
    }

    deleteBySelf[collection][doc._id] = true;

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

const subscribe = function(fn) {
    mongoose.connection.watch().on('change', data => {
        console.log('Change from db:', data);

        if (data.operationType === 'insert') {
            const id = data.fullDocument._id;
            const coll = data.ns.coll;

            // Make sure we don't catch our own insert
            if (insertBySelf[coll][id]) {
                delete insertBySelf[coll][id];
                console.log('Insert from self, skip…');
                return;
            }

            fn({
                id: data._id._data,
                doc: data.fullDocument,
                type: data.operationType,
                collection: coll,
            });
            return;
        }

        if (data.operationType === 'delete') {
            const id = data.documentKey._id.toString();
            const coll = data.ns.coll;

            // Make sure we don't catch our own delete
            if (deleteBySelf[coll][id]) {
                delete deleteBySelf[coll][id];
                console.log('Delete from self, skip…');
                return;
            }

            fn({
                id: data._id._data,
                doc: {
                    _id: id,
                },
                type: data.operationType,
                collection: data.ns.coll,
            });
            return;
        }

        fn(data);
    });
}


exports.connect = function() {
    return connect()
        .then(() => {
            return {
                subscribe,
                publish: updateDB,
            };
        });
}
