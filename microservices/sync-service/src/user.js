const { user } = require('@schnider94/models');
const database = require('@schnider94/database');

const UserSchema = user.create();
user.setup(UserSchema);

const connect = function() {
    return new Promise(resolve => {
        database.connect({
            host: process.env.USER_DB_HOST,
            username: process.env.USER_DB_USERNAME,
            password: process.env.USER_DB_PASSWORD,
            callback: resolve,
            single: false,
        });
    })
};


exports.watch = function(executer) {
    return connect()
        .then(connection => {
            return Promise.resolve(connection.model('user', UserSchema));
        })
        .then(UserModel => {
            UserModel.watch().on('change', executer);
        })
        .catch(error => console.error('Error starting user watcher', error));
}

exports.receive = function(msg) {
    console.log('Update users:', msg);
}
