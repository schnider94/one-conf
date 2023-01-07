const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const auth = require('./auth');
const jwtMiddleware = require('@schnider94/jwt-middleware');

auth.setupPassport();

// TODO: Replace public_key with secret or public_key
jwtMiddleware.setup('public_key');

const routes = require('./routes/index');
const secureRoutes = require('./routes/secure');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

const start = function() {
    app.listen(4000, () => {
        console.log('app listening on port 4000');
    });   
};

module.exports = {
    start
};
