const { user } = require('@schnider94/models');
const database = require('@schnider94/database');

const UserSchema = user.create();
user.setup(UserSchema);

const connect = function() {
    return new Promise(resolve => {
        database.connect({
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            callback: resolve,
        });
    })
};


exports.watch = function(executer) {
    connect()
        .then(connection => {
            return Promise.resolve(connection.model('user', UserSchema));
        })
        .then(UserModel => {
            UserModel.watch().on('change', executer);
        })
        .catch(error => console.error(error));
}
