const express = require('express');

const UserModel = require('../models/user');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conferense user-service API v1',
    });
});

router.get('/me', async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);

        return res.json({ data: user });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
