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

    use(app);

    app.use(function(err, _, res, _) {
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
