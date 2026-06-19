const express = require('express');
const router = express.Router();

const {
    createPlayer,
    getPlayers,
    getPlayersByTeam
} = require('../controllers/playerController');

router.post('/', createPlayer);

router.get('/', getPlayers);

router.get('/team/:teamId', getPlayersByTeam);

module.exports = router;