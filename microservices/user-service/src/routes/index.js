const express = require('express');
const mongoose = require('mongoose');

const UserModel = require('../models/user');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conferense user-service API v1',
    });
});

router.get('/me', async (req, res) => {
    try {
        const user = await UserModel
            .findById(req.user._id)
            .exec();

        // We don't want to send the password
        const { password, ...data } = user._doc;

        return res.json({ data });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel
            .findById(req.params.id)
            .exec();

        // We don't want to send the password
        const { _id, name } = user._doc;

        return res.json({
            data: {
                _id,
                name,
            }
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.post('/byIds', async (req, res) => {
    try {
        const ids = req.body.ids.map(mongoose.Types.ObjectId);

        const users = await UserModel
            .find({ _id: { $in: ids } })
            .exec();

        console.log(users);

        const data = users.map(user => ({
            _id: user._doc._id,
            name: user._doc.name,
        }));

        return res.json({
            data
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
