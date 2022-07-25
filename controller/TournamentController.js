const db = require('../db');

class TournamentController {
    async createtournament(req, res) {
        const {name, begin_date, end_date, location, number_of_seats} = req.body;
        const newTournament = await db.query(`INSERT INTO tournament (name, begin_date, end_date, location, number_of_seats) values ($1, $2, $3, $4, $5) RETURNING *`, [name, begin_date, end_date, location, number_of_seats]);
        res.json(newTournament.rows[0]);
    }
    async updatetournament(req, res) {
        const id = req.params.id;
        const {name, begin_date, end_date, location, number_of_seats} = req.body;
        const newTournament = await db.query(`UPDATE tournament set name = $1, begin_date = $2, end_date = $3, location = $4, number_of_seats = $5 where id = $6 RETURNING *`, [name, begin_date, end_date, location, number_of_seats, id]);
        res.json(newTournament.rows[0]);
    }
    async removetournament(req, res) {
        const id = req.params.id;
        const newTournament = await db.query(`DELETE from tournament where id = $1`, [id]);
        res.json('Deleted tournament');
    }
    async addplayer_to_tournament(req, res) {
        const {login} = req.body;
        const tournament_id = req.params.id;
        const player_id = await db.query(`SELECT id from player where login = $1`, [login]);
        const newTournament = await db.query(`INSERT INTO player_tournament (tournament_id, player_id) values ($1, $2) RETURNING *`, [tournament_id, player_id.rows[0].id]);
        await db.query(`UPDATE tournament set number_of_seats = number_of_seats - 1 where id = $1`, [tournament_id]);
        res.json(newTournament.rows[0]);
    }
    async removeplayer_from_tournament(req, res) {
        const {login} = req.body;
        const tournament_id = req.params.id;
        const player_id = await db.query(`SELECT id from player where login = $1`, [login]);
        const newTournament = await db.query(`DELETE from player_tournament where (tournament_id = $1 and player_id = $2)`, [tournament_id, player_id.rows[0].id]);
        await db.query(`UPDATE tournament set number_of_seats = number_of_seats + 1 where id = $1`, [tournament_id]);
        res.json('Deleted player from tournament');
    }
    async upcoming_tournaments(req, res) {
        const current_date = new Date();
        const newTournament = await db.query(`SELECT * from tournament where begin_date > current_date`);
        res.json(newTournament.rows);
    }
    async tournaments_for_the_period(req, res) {
        const {first_date, second_date} = req.body;
        const newTournament = await db.query(`SELECT * from tournament where (begin_date >= $1 and end_date <= $2)`, [first_date, second_date]);
        res.json(newTournament.rows);
    }
}

module.exports = new TournamentController();