const user = require('./user');

exports.start = function() {
    user.watch(data => console.log(data));
}
