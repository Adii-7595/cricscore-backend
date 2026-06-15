const axios = require('axios');
const Match = require('../models/Match');

async function updatePlayingXI(matchId) {

    try {

        console.log(
            `Fetching Playing XI for Match ${matchId}`
        );

        const match = await Match.findOne({
            matchId
        });

        if (!match) {

            console.log('Match not found');

            return;
        }

        const team1Id =
            match.rawData.matchInfo.team1.teamId;

        const team2Id =
            match.rawData.matchInfo.team2.teamId;

        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        };

        const team1Response =
            await axios.get(
                `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/team/${team1Id}`,
                { headers }
            );

        const team2Response =
            await axios.get(
                `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/team/${team2Id}`,
                { headers }
            );

        await Match.findOneAndUpdate(
            { matchId },
            {
                playingXIData: {
                    team1: team1Response.data,
                    team2: team2Response.data
                }
            }
        );

        console.log(
            `Playing XI Updated -> ${matchId}`
        );

    } catch (err) {

        console.error(
            err.response?.data || err.message
        );

    }

}

module.exports = updatePlayingXI;