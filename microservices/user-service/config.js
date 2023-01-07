const mongoose = require('mongoose');

const setupDatabase = function() {
    // DATABASE
    const host = process.env.DB_HOST;
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;

    const connectString = `mongodb://${username}:${password}@${host}/${database}`;

    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on('error', error => console.log(error) );
    mongoose.Promise = global.Promise;
}

module.exports = {
    setupDatabase,
}
