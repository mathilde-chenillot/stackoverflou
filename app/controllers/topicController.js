const Topic = require('../models/Topic');

exports.getAllTopics = async (req, res) => {
    try {
        const topic = await Topic.find();
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        console.log('end getAllTopics');
    }
};