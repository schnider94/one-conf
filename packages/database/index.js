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
        counter++;

        if (counter > 50) {
            console.error(`More than 50 tries when connecting to ${connectString}, abort...`);

            throw new Error('Too many tries');
        }

        mongoose
            .connect(connectString)
            .then(callback)
            .catch(error => {
                console.log('Error while connecting to mongodb:');
                console.error(error);

                setTimeout(connect, 5000);
            });
    };
    connect();
}
