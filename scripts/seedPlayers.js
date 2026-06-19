const mongoose = require('mongoose');
require('dotenv').config();

const Player = require('../models/Player');

const TOURNAMENT_ID = '6a3029ece0a439fa95cb4f47';

const teams = [
    { id: '6a306a845d7e5253fd5f5c85', shortName: 'MW' },
    { id: '6a306a845d7e5253fd5f5c86', shortName: 'DT' },
    { id: '6a306a845d7e5253fd5f5c87', shortName: 'CK' },
    { id: '6a306a845d7e5253fd5f5c88', shortName: 'BB' },
    { id: '6a306a845d7e5253fd5f5c89', shortName: 'HH' },
    { id: '6a306a845d7e5253fd5f5c8a', shortName: 'KK' },
    { id: '6a306a845d7e5253fd5f5c8b', shortName: 'PP' },
    { id: '6a306a845d7e5253fd5f5c8c', shortName: 'GG' },
    { id: '6a306a845d7e5253fd5f5c8d', shortName: 'LL' },
    { id: '6a306a845d7e5253fd5f5c8e', shortName: 'RR' }
];

async function seedPlayers() {

    await mongoose.connect(process.env.MONGO_URL);

    const players = [];

    for (const team of teams) {

        for (let i = 1; i <= 15; i++) {

            let role;

            if (i === 1) role = 'Wicket Keeper';
            else if (i <= 6) role = 'Batsman';
            else if (i <= 9) role = 'All Rounder';
            else role = 'Bowler';

            players.push({
                tournamentId: TOURNAMENT_ID,
                teamId: team.id,

                name: `${team.shortName} Player ${i}`,

                role,

                jerseyNumber: i,

                battingStyle: 'Right Hand Bat',

                bowlingStyle:
                    role === 'Bowler' || role === 'All Rounder'
                        ? 'Right Arm Medium'
                        : 'N/A',

                isCaptain: i === 1,

                isViceCaptain: i === 2,

                isBench: i > 11
            });
        }
    }

    await Player.deleteMany({
        tournamentId: TOURNAMENT_ID
    });

    await Player.insertMany(players);

    console.log(`Inserted ${players.length} players`);

    process.exit();
}

seedPlayers().catch(err => {
    console.error(err);
    process.exit(1);
});