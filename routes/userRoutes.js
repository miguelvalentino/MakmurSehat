const express = require('express');
const router = express.Router();
const userController = require('../controller/userControllers');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/profile', userController.getProfile);
router.post('/logout', userController.logout);

module.exports = router;
