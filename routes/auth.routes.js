const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/user/login', authController.loginPage);
router.post('/user/auth', authController.authenticate);
router.post('/user/register', authController.register);
router.get('/user/logout', authController.logout);

module.exports = router;