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
        mongoose
            .connect(connectString)
            .then(callback)
            .catch(error => {
                console.log('Error while connecting to mongodb:');
                console.error(error);
                counter++;

                setTimeout(connect, 1000);
            });
    };
    connect();
}
