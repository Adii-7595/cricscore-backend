const Tournament =
require('../models/Tournament');

exports.createTournament =
async (req, res) => {

    try {

        const tournament =
            await Tournament.create(
                req.body
            );

        res.status(201).json({
            success: true,
            tournament
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getTournaments =
async (req, res) => {

    try {

        const tournaments =
            await Tournament.find();

        res.json({
            success: true,
            tournaments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};