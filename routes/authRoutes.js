const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.loginPage);
router.post('/auth', authController.authenticate);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;