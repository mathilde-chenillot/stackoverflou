const { Router } = require('express');
const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');

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
    
module.exports = router;