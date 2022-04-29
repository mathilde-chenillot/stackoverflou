const Topic = require('../models/Topic');

exports.getAllTopics = async (req, res) => {
    try {
        const topic = await Topic.find();
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.getOneTopic = async (req, res) => {
    try {

        const topic = await Topic.findOne({ _id: req.params.id });
        res.status(200).json(topic);

    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.createTopic = async (req, res) => {
    try {
        const newTopic = await new Topic({
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id,
            creationDate: new Date(),
        }).save();

        res.status(201).json({ newTopic });

    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.modifyTopic = async (req, res) => {
    try {
        const { id } = req.params;

        const topic = await Topic.updateOne({ _id: id }, {
            ...req.body,
            _id: id,
        });

        res.status(201).json(topic);
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.deleteTopic = async (req, res) => {
    try {

        const { id } = req.params;
        await Topic.findOne({ _id: id});
        await Topic.deleteOne({ _id: id});
        res.status(204).json();
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};