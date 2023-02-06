const express = require('express');
const ConferenceModel = require('../models/conference');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conference conference-service API v1',
    });
});

router.get('/all', async (_, res) => {
    try {
        const conferences = await ConferenceModel.find({}).exec();

        return res.json({ data: conferences });
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
        const conferences = await ConferenceModel
            .find({$text: {$search: search}})
            .skip(page)
            .limit(limit)
            .exec();

        return res.json({ data: conferences });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/mine', async (req, res) => {
    try {
        const conferences = await ConferenceModel
            .find({ $or: 
                [
                    { speakers: req.user._id },
                    { attendees: req.user._id },
                    { owner: req.user._id }
                ]
            })
            .exec();

        return res.json({ data: conferences });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const conference = await ConferenceModel
            .findById(req.params.id)
            .exec();

        return res.json({
            data: conference,
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const conference = await ConferenceModel.create({
            ...req.body,
            owner: req.user._id
        });

        return res.json({
            data: conference,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { id, ...params } = req.params;

        const conference = await ConferenceModel
            .findByIdAndUpdate(
                id,
                {
                    $set: params
                },
                {
                    returnDocument: 'after',
                }
            )
            .exec();

        return res.json({
            data: conference,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.put('/:id/attendance', async (req, res) => {
    try {
        const keynote = await ConferenceModel
            .findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: {
                        attendees: req.user._id
                    }
                },
                {
                    returnDocument: 'after',
                }
            )
            .exec();

        return res.json({ data: keynote });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.delete('/:id/attendance', async (req, res) => {
    try {
        const keynote = await ConferenceModel
            .findByIdAndUpdate(
                req.params.id,
                {
                    $pull: {
                        attendees: req.user._id
                    }
                },
                {
                    returnDocument: 'after',
                }
            )
            .exec();

        return res.json({ data: keynote });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ConferenceModel.deleteOne({ _id: req.params.id });

        return res.json({
            message: 'Successfully deleted conference',
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
