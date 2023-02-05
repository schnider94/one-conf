const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conferense user-service API v1',
    });
});

router.get(
    '/me',
    (req, res) => {
        res.json({
            user: req.user
        })
    }
);

module.exports = router;
