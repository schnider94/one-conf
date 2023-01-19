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
        owner: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            require: true,
        },
        ...schema,
    });
};

const setup = function(Schema) {
    
};

module.exports = {
    create,
    setup,
}
