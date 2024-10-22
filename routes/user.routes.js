const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/user/profile', userController.getProfile);
router.get('/user/:id', userController.getUserById);

module.exports = router;