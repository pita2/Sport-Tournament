require('dotenv').config();

const express = require('express');
request = require('request');
const db = require('../sport-tournament/db');
const app = express();
const PORT = process.env.PORT || 3000;

const PlayerRouter = require('../sport-tournament/routs/PlayerRouts');
const TournamentRouter = require('../sport-tournament/routs/TournamentRouts');

app.use(express.json());
app.use('/api', PlayerRouter);
app.use('/t', TournamentRouter);

app.listen(PORT, 'localhost', () => {
    console.log(`Listening port ${PORT}`);
})
