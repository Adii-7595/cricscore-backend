const express = require('express');

const router = express.Router();

const {
    createTournament,
    getTournaments
} = require(
    '../controllers/tournamentController'
);

router.post(
    '/',
    createTournament
);

router.get(
    '/',
    getTournaments
);

module.exports = router;