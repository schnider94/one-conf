const express = require('express');
const ConferenceModel = require('../models/conference');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conference conference-service API v1',
    });
});

router.get('/:id', async (req, res) => {
    try {
        const conference = await ConferenceModel.findById(req.params.id);

        return res.json({
            data: conference,
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/all', async (_, res) => {
    try {
        const conferences = await ConferenceModel.find({});

        return res.json({ data: conferences });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const conference = await ConferenceModel.create(req.body);

        return res.json({
            data: conference,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ConferenceModel.remove({ _id: req.params.id });

        return res.json({
            message: 'Successfully deleted conference',
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
