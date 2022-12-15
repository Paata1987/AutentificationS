const Router = require('express');

const router = new Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.get('/activate/:link');
//endpoint who rewriting access token if it not valid
router.get('/refresh');
router.get('/users');

module.exports = router;
