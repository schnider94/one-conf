const express = require('express');
const bodyParser = require('body-parser');

exports.create = function(use) {
    const requestLogger = function (req, res, next) {
        console.log(`Request ${req.originalUrl} from ${req.ip}`);
        next();
    };

    const app = express();

    app.use(requestLogger);
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/healthz', (_, res) => res.sendStatus(200));

    use(app);

    app.use(function(err, _, res, _) {
        console.log('Error: ', err);
        res.status(err.status || 500);
        res.json({ error: err });
    });

    const start = function() {
        app.listen(4000, () => {
            console.log('App listening on port 4000…');
        });   
    };

    return {
        start,
    };
}
