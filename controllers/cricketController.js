const Match = require('../models/Match');

exports.getLiveMatches = async (req, res) => {
    try {

        const stateMap = {
            live: 'In Progress',
            completed: 'Complete',
            stumps: 'Stumps',
            upcoming: 'Preview'
        };

        const filter = {};
        if (req.query.status) {
            filter.state = stateMap[req.query.status];
        }

        if (req.query.team) {

            filter.$or = [
                {
                    team1: {
                        $regex: req.query.team,
                        $options: 'i'
                    }
                },
                {
                    team2: {
                        $regex: req.query.team,
                        $options: 'i'
                    }
                }
            ];

        }

        // console.log("TEAM =", req.query.team);
        // console.log("FILTER =", JSON.stringify(filter, null, 2));
        const matches = await Match.find(
            filter,
            {
                _id: 0,
                matchId: 1,
                series: 1,
                team1: 1,
                team2: 1,
                status: 1,
                state: 1,
                lastUpdated: 1
            }
        );

        res.status(200).json({
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

exports.getMatchById = async (req, res) => {
    try {

        const match = await Match.findOne({
            matchId: Number(req.params.matchId)
        });

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

exports.getMatchInfo = async (req, res) => {

    try {

        const match = await Match.findOne(
            {
                matchId: Number(req.params.matchId)
            },
            {
                matchInfoData: 1,
                _id: 0
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
            matchInfo: match.matchInfoData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getMatchScorecard = async (req, res) => {

    try {

        const match = await Match.findOne(
            {
                matchId: Number(req.params.matchId)
            },
            {
                scorecardData: 1,
                _id: 0
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
            scorecard: match.scorecardData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// exports.getMatchScorecard = async (req, res) => {

//     try {

//         const match = await Match.findOne(
//             {
//                 matchId: Number(req.params.matchId)
//             },
//             {
//                 scorecardData: 1,
//                 _id: 0
//             }
//         );

//         if (!match) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Match not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             scorecard: match.scorecardData
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// };

exports.getMatchCommentary = async (req, res) => {

    try {

        const match = await Match.findOne(
            {
                matchId: Number(req.params.matchId)
            },
            {
                commentaryData: 1,
                _id: 0
            }
        );

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.json({
            success: true,
            commentary: match.commentaryData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getPlayingXI = async (
    req,
    res
) => {

    try {

        const match =
            await Match.findOne(
                {
                    matchId: Number(
                        req.params.matchId
                    )
                },
                {
                    playingXIData: 1,
                    _id: 0
                }
            );

        if (!match) {

            return res.status(404).json({
                success: false,
                message:
                    'Match not found'
            });

        }

        res.status(200).json({
            success: true,
            playingXI:
                match.playingXIData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};