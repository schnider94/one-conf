const mongoose = require('mongoose');

const ConferenceModelDefault = require('@schnider94/models').conference;

const ConferenceSchema = ConferenceModelDefault.create({

});

ConferenceModelDefault.setup(ConferenceSchema);

const ConferenceModel = mongoose.model('conference', ConferenceSchema);

module.exports = ConferenceModel;
