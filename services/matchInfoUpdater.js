const axios = require('axios');
const Match = require('../models/Match');

async function updateMatchInfo(matchId) {

    try {

        console.log(`Fetching info for ${matchId}`);

        const response = await axios.get(
            `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}`,
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
                matchInfoData: response.data,
                lastUpdated: new Date()
            }
        );

        console.log(`Info Updated -> ${matchId}`);

    } catch (error) {

        console.error(error.response?.data || error.message);

    }

}

module.exports = updateMatchInfo;
