const mongoose = require('mongoose');

const KeynoteModelDefault = require('@schnider94/models').keynote;

let KeynoteSchema;

if (process.env.CLOUD_ENVIRONMENT === 'private') {
    KeynoteSchema = KeynoteModelDefault.create({
        secretDescription: {
            type: String,
            require: false,
        },
    });            
} else {
    KeynoteSchema = KeynoteModelDefault.create({});      
}

KeynoteModelDefault.setup(KeynoteSchema);

const KeynoteModel = mongoose.model('keynote', KeynoteSchema);

module.exports = KeynoteModel;
