const { Router } = require('express');
const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');
const messageController = require('./controllers/messageController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 200, message : 'ok'})
});

// user
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);

// topic
router.route('/topic')
    .get(topicController.getAllTopics)
    .post(topicController.createTopic);

router.route('/topic/:id')
    .get(topicController.getOneTopic)
    .patch(topicController.modifyTopic)
    .delete(topicController.deleteTopic);

// message
// topic
router.route('/message')
    .get(messageController.getAllMessages)
    .post(messageController.createMessage);

router.route('/message/:id')
    .patch(messageController.modifyMessage)
    .delete(messageController.deleteMessage);
    
module.exports = router;