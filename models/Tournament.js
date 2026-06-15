const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    format: {
        type: String,
        enum: ['T10', 'T20', 'ODI', 'TEST']
    },

    location: String,

    startDate: Date,

    endDate: Date,

    status: {
        type: String,
        default: 'upcoming'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    'Tournament',
    tournamentSchema
);