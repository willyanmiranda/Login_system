const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webHookController');

router.post('/webhook', webhookController.updateWebhook );

module.exports = router;