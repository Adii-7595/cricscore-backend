const axios = require('axios');

const headers = {
    'x-rapidapi-key': process.env.RAPID_API_KEY,
    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
};

exports.getGalleryList = async () => {

    const response = await axios.get(
        'https://cricbuzz-cricket.p.rapidapi.com/photos/v1/index',
        { headers }
    );

    console.log(response.data);
   

    return response.data;
};

exports.getGalleryDetails = async (galleryId) => {

    const response = await axios.get(
        `https://cricbuzz-cricket.p.rapidapi.com/photos/v1/detail/${galleryId}`,
        { headers }
    );

    return response.data;
};