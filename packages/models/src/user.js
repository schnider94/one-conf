const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const create = function(schema) {
    return new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        ...schema,
    });
};

const setup = function(Schema) {
    Schema.pre(
        'save',
        async function(next) {
            const user = this;
            const hash = await bcrypt.hash(this.password, 10);
    
            this.password = hash;
            next();
        }
    );

    Schema.methods.isValidPassword = async function(password) {
        const user = this;
        const compare = await bcrypt.compare(password, user.password);
    
        return compare;
    }
};

module.exports = {
    create,
    setup,
}
