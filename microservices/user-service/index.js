const { createApp } = require('@schnider94/app');
const database = require('@schnider94/database');
const jwtMiddleware = require('@schnider94/jwt-middleware');
const server = require('@schnider94/server');
const passport = require('passport');

const auth = require('./src/auth');
const server = require('./src/server');

// Routes
const routes = require('./src/routes');
const authRoutes = require('./src/routes/auth');

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
        auth.setupPassport();
        // TODO: Replace public_key with secret or public RSA key
        jwtMiddleware.setup('public_key');

        next();
    })
    .start(
        server.create((app) => {
            app.use('/auth', authRoutes);
            app.use('/user', passport.authenticate('jwt', { session: false }), routes);
        })
    );
