const Topic = require('../models/Topic');

exports.getAllTopics = async (req, res) => {
    try {
        const topic = await Topic.find();
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error });
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