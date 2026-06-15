const Match = require('../models/Match');

exports.createMatch = async (req, res) => {

    try {

        const match = await Match.create({
            ...req.body,
            source: 'manual'
        });

        res.status(201).json({
            success: true,
            match
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getManualMatches = async (req, res) => {

    try {

        const matches = await Match.find({
            source: 'manual'
        });

        res.json({
            success: true,
            total: matches.length,
            matches
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.updateToss = async (req, res) => {

    try {

        const match = await Match.findByIdAndUpdate(
            req.params.id,
            {
                tossData: req.body
            },
            {
                new: true
            }
        );

        if (!match) {

            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });

        }

        res.status(200).json({
            success: true,
            match
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};