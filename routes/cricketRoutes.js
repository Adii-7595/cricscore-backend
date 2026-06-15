const express = require('express');

const {
    getLiveMatches,
    getMatchById,
    getMatchInfo,
    getMatchScorecard,
    getMatchCommentary,
    getPlayingXI
} = require('../controllers/cricketController');

const router = express.Router();

router.get('/live-matches', getLiveMatches);
router.get('/match/:matchId', getMatchById);
router.get('/match/:matchId/info', getMatchInfo);
router.get('/match/:matchId/scorecard',getMatchScorecard);
router.get('/match/:matchId/commentary',getMatchCommentary);
router.get('/match/:matchId/playing11',getPlayingXI);

module.exports = router;