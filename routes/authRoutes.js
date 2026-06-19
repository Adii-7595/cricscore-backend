const express = require('express');

const router = express.Router();

const {
    login,
    getCurrentAdmin
} = require('../controllers/authController');

const {
    authenticateToken
} = require('../middleware/authMiddleware');

router.post('/login', login);

router.get(
    '/me',
    authenticateToken,
    getCurrentAdmin
);

module.exports = router;