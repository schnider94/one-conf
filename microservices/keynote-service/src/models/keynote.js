const mongoose = require('mongoose');

const KeynoteModelDefault = require('@schnider94/models').keynote;

const KeynoteSchema = KeynoteModelDefault.create({

});

KeynoteModelDefault.setup(KeynoteSchema);

const KeynoteModel = mongoose.model('keynote', KeynoteSchema);

module.exports = KeynoteModel;
