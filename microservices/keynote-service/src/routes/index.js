const express = require('express');
const KeynoteModel = require('./../models/keynote');

const router = express.Router();

router.get('/', (_, res) => {
    return res.json({
        message: 'Conference keynote-service API v1',
    });
});

router.get('/all', async (_, res) => {
    try {
        const keynotes = await KeynoteModel.find({}).exec();

        return res.json({ data: keynotes });
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
        const keynotes = await KeynoteModel
            .find({$text: {$search: search}})
            .skip(page)
            .limit(limit)
            .exec();

        return res.json({ data: keynotes });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/conference/:id', async (req, res) => {
    try {
        const keynotes = await KeynoteModel
            .find({ conference: req.params.id }).exec();

        return res.json({ data: keynotes });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get('/mine', async (req, res) => {
    try {
        const keynotes = await KeynoteModel
            .find({ speakers: req.user._id }).exec();

        return res.json({ data: keynotes });
    } catch (error) {
        return res.status(500).json({ error });
    }
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
