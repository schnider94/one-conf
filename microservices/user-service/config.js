const mongoose = require('mongoose');

const setupDatabase = function(callback) {
    // DATABASE
    const host = process.env.DB_HOST;
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;

    const connectString = `mongodb://${username}:${password}@${host}/${database}`;

    let counter = 0;

    const connect = () => {
        console.log('Connect to Mongodb...')
        counter++;

        mongoose.connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (counter > 50) {
            console.error('Connection failed 50 times, exiting...');
            exit(1);
        }
    };

    mongoose.connection.on('error', function(error) {
        console.log(error);
        counter++;

        setTimeout(connect, 5000);
    });
    connect();

    mongoose.connection.on('open', () => callback());

    mongoose.Promise = global.Promise;
}

module.exports = {
    setupDatabase,
}
