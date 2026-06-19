exports.getCricbuzzImageUrl = (imageId) => {
    return `${process.env.CRICBUZZ_IMAGE_BASE_URL}/c${imageId}/i.jpg`;
};

