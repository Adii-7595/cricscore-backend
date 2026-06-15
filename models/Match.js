const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchId: {
        type: Number,
        required: function () {
            return this.source === 'rapidapi';
        },
        sparse: true
    },

    series: {
        type: String,
        required: function () {
            return this.source === 'rapidapi';
        }
    },

    team1: {
        type: String,
        required: true
    },

    team2: {
        type: String,
        required: true
    },

    status: String,

    state: String,

    rawData: {
        type: Object,
        default: {}
    },
    matchInfoData: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    scorecardData: {
        type: Object,
        default: null
    },
    commentaryData: {
        type: Object,
        default: null
    },

    playingXIData: {
        type: Object,
        default: null
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    },

    source: {
        type: String,
        enum: ['rapidapi', 'manual'],
        default: 'rapidapi'
    },
    
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        default: null
    },
    
    team1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    
    team2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },

    venue: String,

    matchDate: Date,

    tossData: {
        type: Object,
        default: null
    },

    manualMatchId: {
        type: String,
        default: null
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);