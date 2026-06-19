const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({

    galleryId: {
        type: Number,
        required: true,
        index: true
    },

    imageId: {
        type: Number,
        required: true
    },

    caption: {
        type: String,
        default: ''
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Photo', photoSchema);