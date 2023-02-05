const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const create = function(schema) {
    return new Schema({
        location: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        speakers: {
            type: [mongoose.Types.ObjectId],
            required: true
        },
        conference: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        ...schema,
    });
};

const setup = function(Schema) {
    Schema.index({ name: 'text', location: 'text' });
};

module.exports = {
    create,
    setup,
}
