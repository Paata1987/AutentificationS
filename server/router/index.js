const Router = require('express');
const userController = require('../controlllers/user-controller');
const UserController = require('../controlllers/user-controller');
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
//endpoint who rewriting access token if it not valid
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

module.exports = router;
