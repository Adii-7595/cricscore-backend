const Team = require('../models/Team');

exports.createTeam = async (req, res) => {

    try {

        const team = await Team.create(
            req.body
        );

        res.status(201).json({
            success: true,
            team
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getTeams = async (req, res) => {

    try {

        const filter = {};

        if (req.query.tournamentId) {

            filter.tournamentId =
                req.query.tournamentId;

        }

        const teams =
            await Team.find(filter);

        res.status(200).json({
            success: true,
            total: teams.length,
            teams
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};