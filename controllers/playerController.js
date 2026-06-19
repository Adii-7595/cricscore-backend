const Player = require('../models/Player');

exports.createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);

        res.status(201).json({
            success: true,
            data: player
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getPlayers = async (req, res) => {
    try {

        const players = await Player.find()
            .populate('teamId', 'name shortName')
            .populate('tournamentId', 'name');

        res.status(200).json({
            success: true,
            count: players.length,
            data: players
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getPlayersByTeam = async (req, res) => {
    try {

        const players = await Player.find({
            teamId: req.params.teamId
        });

        res.status(200).json({
            success: true,
            count: players.length,
            data: players
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};