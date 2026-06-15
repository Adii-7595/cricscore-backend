require('dotenv').config();

const updateMatches = require('./services/matchUpdater');
const updateMatchInfo = require('./services/matchInfoUpdater');
const updateScorecard = require('./services/updateScorecard');
const updatePlayingXI = require('./services/updatePlayingXI');
const updateCommentary = require('./services/updateCommentary');
const tournamentRoutes = require('./routes/tournamentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const manualMatchRoutes = require('./routes/manualMatchRoutes');


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');

const cricketRoutes = require('./routes/cricketRoutes');

const app = express();

const LIVE_URL =
    'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live';

const UPCOMING_URL =
    'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming';

const RECENT_URL =
    'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/cricket', cricketRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/teams',teamRoutes);
app.use('/api/manual-matches', manualMatchRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected');
})
.catch(err => {
    console.log(err);
});

// // Initial Sync
// updateMatches(LIVE_URL);

// // Live Matches Refresh Every 1 Minute
// setInterval(() => {

//     updateMatches(LIVE_URL);

// }, 60000);

// updateMatches(UPCOMING_URL);

// // Upcoming Matches Refresh Every 5 Minutes
// setInterval(() => {

//     updateMatches(UPCOMING_URL);

// }, 300000);

// updateMatches(RECENT_URL);
// //Recent Matches Refresh Every 5 Minutes
// setInterval(() => {

//     updateMatches(RECENT_URL);

// }, 300000);


// updateMatchInfo(148393);
// updateScorecard(148393);


// updateCommentary(148393);   



// updatePlayingXI(148393);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});