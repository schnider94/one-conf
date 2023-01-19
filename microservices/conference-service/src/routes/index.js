const express = require('express');
const ConferenceModel = require('../models/conference');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conference conference-service API v1',
    });
});

router.post('/', async (req, res) => {
    try {
        const conference = await ConferenceModel.create(req.body)

        return res.json({
            message: 'Successfully created conference',
            data: conference,
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.delete('/:id', async (req) => {
    try {
        await ConferenceModel.deleteOne({ _id: req.params.id })

        return res.json({
            message: 'Successfully deleted conference',
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
