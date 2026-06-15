const express = require('express');

const router = express.Router();

const {
    createMatch,
    getManualMatches,
    updateToss
} = require('../controllers/manualMatchController');

router.post('/', createMatch);

router.get('/', getManualMatches);

router.patch('/:id/toss',updateToss);

module.exports = router;