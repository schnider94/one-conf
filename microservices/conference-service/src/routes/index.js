const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conferense conference-service API v1',
    });
});

module.exports = router;
