const express = require('express');
const router = express.Router();
const authController = require('./controller');

router.get('/', authController.index)
router.post('/login', authController.login)
router.delete('/logout', authController.logout)

// Exports cho biến user_router
module.exports = router;