import { Router } from 'express';
import userController from './controllers/userController.js';
import topicController from './controllers/topicController.js';
import messageController from './controllers/messageController.js';
import { checkToken } from './middlewares/checkToken.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 200, message : 'ok'})
});

// user
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);

// topic
router.route('/topic')
    .get(checkToken, topicController.getAllTopics)
    .post(checkToken, topicController.createTopic);

router.route('/topic/:id')
    .get(checkToken, topicController.getOneTopic)
    .patch(checkToken, topicController.modifyTopic)
    .delete(checkToken, topicController.deleteTopic);

// message
router.route('/message')
    .get(checkToken, messageController.getAllMessages)
    .post(checkToken, messageController.createMessage);

router.route('/message/:id')
    .patch(checkToken, messageController.modifyMessage)
    .delete(checkToken, messageController.deleteMessage);

router.get('/message/byTopic/:topicId', checkToken, messageController.getAllByTopic);
    
export default router;