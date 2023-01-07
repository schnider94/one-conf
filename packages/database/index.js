const mongoose = require('mongoose');

exports.connect = function(props) {
    const {
        host,
        username,
        password,
        callback,
    } = props;

    // DATABASE
    const connectString = `mongodb://${username}:${password}@${host}`;

    let counter = 0;

    const connect = () => {
        console.log(`Connect to Mongodb ${connectString} ...`)
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
