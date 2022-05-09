import Topic from '../models/Topic.js';

const topicController = {
    getAllTopics : async (req, res) => {
        try {
            const topic = await Topic.find();
            res.status(200).json(topic);
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    getOneTopic : async (req, res) => {
        try {
    
            const topic = await Topic.findOne({ _id: req.params.id });
            res.status(200).json(topic);
    
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    createTopic : async (req, res) => {
        try {
            const newTopic = await new Topic(req.body).save();
    
            res.status(201).json(newTopic);
    
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    modifyTopic : async (req, res) => {
        try {
    
            const topic = await Topic.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }, // The $set operator replaces the value of a field with the specified value. req.body = what we are gonna change
                { new: true } // to see it in postman, otherwise we would see the old datas in postman, even if in db there are new datas
            );
            
            if(topic) {
                res.status(201).json(topic);
            } else {
                res.status(404).json('Aucun topic ne correspond')
            };
            
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
    
    deleteTopic : async (req, res) => {
        try {
    
            const deleteTopic = await Topic.findByIdAndDelete(req.params.id);

            if(deleteTopic) {
                res.status(404).json('Le topic a bien été supprimé');
            } else {
                res.status(404).json('Aucun topic ne correspond');
            };
            
        } catch (error) {
            res.status(500).send(error.message);
        };
    },
};

export default topicController;