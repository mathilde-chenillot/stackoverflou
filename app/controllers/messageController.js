const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
    try {
        const message = await Message.find();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.createMessage = async (req, res) => {
    try {
        const newMessage = await new Message({
            content: req.body.content,
            user_id: req.body.user_id,
            topic_id: req.body.topic_id,
            creationDate: new Date(),
        }).save();

        res.status(201).json({ newMessage });

    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.modifyMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.updateOne({ _id: id }, {
            ...req.body,
            _id: id, // delete ?
        });

        res.status(201).json(message);
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};

exports.deleteMessage = async (req, res) => {
    try {

        const { id } = req.params;
        await Message.findOne({ _id: id});
        await Message.deleteOne({ _id: id});
        res.status(204).json();
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};