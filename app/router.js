const { Router } = require('express');
const userController = require('./controllers/userController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ status: 200, message : 'ok'})
});

router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);

module.exports = router;