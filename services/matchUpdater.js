const axios = require('axios');
const Match = require('../models/Match');

async function updateMatches(url) {
    try {

        console.log('Fetching matches...');

        const options = {
            method: 'GET',
            url,
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);

        const data = response.data;

        const matches = [];

        data.typeMatches.forEach(type => {

            type.seriesMatches.forEach(series => {

                if (!series.seriesAdWrapper) return;

                series.seriesAdWrapper.matches.forEach(match => {

                    matches.push({
                        matchId: match.matchInfo.matchId,
                    
                        seriesId: match.matchInfo.seriesId,
                        series: match.matchInfo.seriesName,
                    
                        matchFormat: match.matchInfo.matchFormat,
                        matchDesc: match.matchInfo.matchDesc,
                    
                        team1: match.matchInfo.team1.teamName,
                        team1Short: match.matchInfo.team1.teamSName,
                    
                        team2: match.matchInfo.team2.teamName,
                        team2Short: match.matchInfo.team2.teamSName,
                    
                        status: match.matchInfo.status,
                        state: match.matchInfo.state,
                    
                        venue: match.matchInfo.venueInfo?.ground,
                        city: match.matchInfo.venueInfo?.city,
                    
                        rawData: match,
                    
                        lastUpdated: new Date()
                    });

                });

            });

        });

        for (const match of matches) {

            await Match.findOneAndUpdate(
                { matchId: match.matchId },
                match,
                {
                    upsert: true,
                    returnDocument: 'after'
                }
            );

        }

        console.log(
            `${url} -> Updated ${matches.length} matches`
        );

    } catch (err) {

        console.error('MATCH UPDATE ERROR');
        console.error(err.response?.data || err.message);

    }

}

module.exports = updateMatches;