const config = require('./config');
const server = require('./src/server');

config.setupDatabase(() => {
    server.start();
});
