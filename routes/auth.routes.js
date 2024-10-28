const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/user/login', authController.authenticate);
router.post('/user/register', authController.register);
router.get('/user/logout', authController.logout);

module.exports = router;