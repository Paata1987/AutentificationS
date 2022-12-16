const Router = require('express');
const userController = require('../controlllers/user-controller');

const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 16 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
//endpoint who rewriting access token if it not valid
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
