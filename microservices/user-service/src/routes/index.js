const express = require('express');

const UserModel = require('../models/user');

const router = express.Router();

const makeUsersSafe = users => users.map(user => ({
    _id: user._id,
    name: user.name,
    email: user.email,
}));

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

router.get('/search', async (req, res) => {
    const {
        limit = 30,
        page = 0,
        search,
    } = req.query;

    try {
        const users = await UserModel
            .find({$text: {$search: search}})
            .skip(page)
            .limit(limit)
            .exec();

        const safeUsers = makeUsersSafe(users);

        return res.json({ data: safeUsers });
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
        const users = await UserModel
            .find({ _id: { $in: req.body['ids[]'] } })
            .exec();

        const safeUsers = makeUsersSafe(users);

        return res.json({
            data: safeUsers
        });
    } catch (error) {
        console.error(error);
        console.trace();

        return res.status(500).json({ error });
    }
});

module.exports = router;
