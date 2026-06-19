const express = require('express');

const router = express.Router();
const {
    authenticateToken
} = require('../middleware/authMiddleware');

const {
    createTournament,
    getTournaments
} = require(
    '../controllers/tournamentController'
);

router.post('/', authenticateToken, createTournament);

router.get(
    '/',
    getTournaments
);

module.exports = router;