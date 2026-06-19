const mongoose = require('mongoose');

const photoGallerySchema = new mongoose.Schema({

    galleryId: {
        type: Number,
        required: true,
        unique: true
    },

    headline: {
        type: String,
        required: true
    },

    coverImageId: {
        type: Number,
        required: true
    },

    imageHash: String,

    publishedTime: Date,

    intro: String,

    state: String,

    tags: [{
        _id: false,
        itemId: String,
        itemName: String,
        itemType: String
    }],

    imageCount: {
        type: Number,
        default: 0
    },

    isSynced: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('PhotoGallery', photoGallerySchema);