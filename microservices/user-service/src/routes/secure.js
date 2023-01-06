const express = require('express');

const router = express.Router();

router.get(
    '/user',
    (req, res) => {
        res.json({
            user: req.user
        })
    }
);

module.exports = router;
