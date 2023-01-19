const express = require('express');
const KeynoteModel = require('./../models/keynote');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conference keynote-service API v1',
    });
});

router.get('/:id', async (req, res) => {
    try {
        const keynote = await KeynoteModel.findById(req.params.id);

        return res.json({
            data: keynote,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/all', async (_, res) => {
    try {
        const keynotes = await KeynoteModel.find({});

        return res.json({ data: keynotes });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const keynote = await KeynoteModel.create(req.body);

        return res.json({
            data: keynote,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await KeynoteModel.deleteOne({ _id: req.params.id });

        return res.json({
            message: 'Successfully deleted keynote',
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
