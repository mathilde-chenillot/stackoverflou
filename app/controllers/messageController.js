import Message from '../models/Message.js';
import User from '../models/User.js';

const messageController = {

    getAllMessages : async (req, res) => {
        try {
            const message = await Message.find();
            res.status(200).json(message);
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    createMessage : async (req, res) => {
        try {
            if (req.body.content && req.body.content.length === 0) {
                res.status(400).json('Aucun message trouvé');
            } else {
                const newMessage = await new Message(req.body).save();
        
                res.status(201).json(newMessage);
            };
    
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    modifyMessage : async (req, res) => {
        try {
            const message = await Message.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true },
            );

            if(message) {
                res.status(201).json(message);
            } else {
                res.status(404).json('Aucun message ne correspond');
            };
    
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    deleteMessage : async (req, res) => {
        try {
    
            const deleteMessage = await Message.findByIdAndDelete(req.params.id);

            if(deleteMessage) {
                res.status(404).json('Le message a bien été supprimé');
            } else {
                res.status(404).json('Aucun message ne correspond');
            };
            
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    getAllByTopic : async (req, res) => {
        try {
            const messages = await Message.find({ topic_id: req.params.topicId});
            if (!messages || messages.length === 0) {
                res.status(400).json({ message: 'Il n\'y a pas de message', error: messages});
            } else {
                const completeMessages = await Promise.all(messages.map(async (message) => {
                    const user = await User.findOne({ _id: message.user_id });
                    const messageObject = {...message.toObject(), nickname: user.nickname};
                    return messageObject;
                }));
        
                res.status(200).json(completeMessages);
            };
    
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
};

export default messageController;