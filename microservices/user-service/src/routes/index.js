const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conferense user-service API v1',
    });
});

router.get('/test', (_, res) => {
    return res.json({
        message: 'TEST',
    });
});

router.get(
    '/user',
    (req, res) => {
        res.json({
            user: req.user
        })
    }
);

module.exports = router;
