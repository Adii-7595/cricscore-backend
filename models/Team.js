const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },

    name: String,

    shortName: String,

    logo: String,

    captain: String

}, {
    timestamps: true
});

module.exports =
    mongoose.model('Team', teamSchema);