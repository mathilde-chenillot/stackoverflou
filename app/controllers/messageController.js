const Message = require('../models/Message');
const User = require('../models/User');

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

exports.getAllByTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const messages = await Message.find({ topic_id: topicId});
        if (typeof messages.length !== "number") {
            res.status(400).json({ message: 'Il n\y a pas de messages', error: messages});
        };

        const completeMessages = await Promise.all(messages.map(async (message) => {
            const user = await User.findOne({ _id: message.user_id });
            const messageObject = {...message.toObject(), nickname: user.nickname};
            return messageObject;
        }));

        console.log(completeMessages);

        res.status(200).json({ message: 'message by topic', messages: completeMessages})
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        console.log('end');
    };
};