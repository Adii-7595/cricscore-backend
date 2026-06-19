const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({

    storyId: {
        type: Number,
        required: true,
        unique: true
    },

    headline: String,

    seoHeadline: String,

    intro: String,

    context: String,

    storyType: String,

    source: String,

    publishTime: Date,

    coverImageId: Number,

    coverImageCaption: String,

    coverImageSource: String,

    authors: [{
        _id: false,

        id: Number,

        name: String,

        imageId: Number,

        twitterHandle: String
    }],

    tags: [{
        _id: false,

        itemId: String,

        itemName: String,

        itemType: String
    }],

    content: [String],

    isSynced: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('News', newsSchema);