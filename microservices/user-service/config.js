const mongoose = require('mongoose');

const setupDatabase = function() {
    // DATABASE
    // TODO: Use environment variables from Helm
    mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.set("useCreateIndex", true);
    mongoose.connection.on('error', error => console.log(error) );
    mongoose.Promise = global.Promise;
}

module.exports = {
    setupDatabase,
}
