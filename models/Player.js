const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },

    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['Batsman', 'Bowler', 'All Rounder', 'Wicket Keeper'],
        required: true
    },

    jerseyNumber: {
        type: Number,
        required: true
    },

    battingStyle: String,

    bowlingStyle: String,

    isCaptain: {
        type: Boolean,
        default: false
    },

    isViceCaptain: {
        type: Boolean,
        default: false
    },

    isBench: {
        type: Boolean,
        default: false
      }
}, {
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);