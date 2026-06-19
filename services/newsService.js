const axios = require('axios');

const headers = {
    'x-rapidapi-key': process.env.RAPID_API_KEY,
    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
};

exports.getNewsList = async () => {

    const response = await axios.get(
        'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
        { headers }
    );

    return response.data;
};

exports.getNewsDetail = async (storyId) => {

    const response = await axios.get(
        `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${storyId}`,
        { headers }
    );

    return response.data;
};