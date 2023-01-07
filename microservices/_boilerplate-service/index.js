const { createApp } = require('@schnider94/app');
const database = require('@schnider94/database');
const passport = require('passport');

const server = require('./src/server');
const routes = require('./src/routes');

createApp()
    .use(function(next) {
        database.setup({
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            callback: next,
        });
    })
    .start(
        server.create((app) => {
            app.use('/example', passport.authenticate('jwt', { session: false }), routes);
        })
    );
