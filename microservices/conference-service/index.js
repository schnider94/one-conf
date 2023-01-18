const { createApp } = require('@schnider94/app');
const database = require('@schnider94/database');
const jwtMiddleware = require('@schnider94/jwt-middleware');
const server = require('@schnider94/server');
const passport = require('passport');

const routes = require('./src/routes');

createApp()
    .use(function(next) {
        database.connect({
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            callback: next,
        });
    })
    .use(function(next) {
        jwtMiddleware.setup(process.env.JWT_SECRET);

        next();
    })
    .start(
        server.create((app) => {
            app.use('/api/conference', passport.authenticate('jwt', { session: false }), routes);
        })
    );
