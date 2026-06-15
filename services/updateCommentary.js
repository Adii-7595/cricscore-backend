const axios = require('axios');
const Match = require('../models/Match');

async function updateCommentary(matchId) {

    try {

        console.log(`Fetching commentary for ${matchId}`);

        const response = await axios.get(
            `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/comm`,
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
                commentaryData: response.data
            }
        );

        console.log(`Commentary Updated -> ${matchId}`);

    } catch (err) {

        console.error('COMMENTARY UPDATE ERROR');
        console.error(err.response?.data || err.message);

    }

}

module.exports = updateCommentary;