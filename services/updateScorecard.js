const axios = require('axios');
const Match = require('../models/Match');

async function updateScorecard(matchId) {

    try {

        console.log(`Fetching scorecard for ${matchId}`);

        const response = await axios.get(
            `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
            {
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': process.env.RAPID_API_HOST
                }
            }
        );

        await Match.findOneAndUpdate(
            { matchId },
            {
                scorecardData: response.data
            }
        );

        console.log(`Scorecard Updated -> ${matchId}`);

    } catch (err) {

        console.error('SCORECARD UPDATE ERROR');
        console.error(err.response?.data || err.message);

    }

}

module.exports = updateScorecard;