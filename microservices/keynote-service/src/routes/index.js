const express = require('express');
const KeynoteModel = require('./../models/keynote');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conference keynote-service API v1',
    });
});

router.post('/', async (req, res) => {
    try {
        const keynote = await KeynoteModel.create(req.body)

        return res.json({
            message: 'Successfully created keynote',
            data: keynote,
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.delete('/:id', async (req) => {
    try {
        await KeynoteModel.deleteOne({ _id: req.params.id })

        return res.json({
            message: 'Successfully deleted keynote',
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
