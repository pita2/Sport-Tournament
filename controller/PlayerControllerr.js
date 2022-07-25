const db = require('../db');
class PlayerControllerr {
    async addplayer(req, res) {
        const {login, name, surname} = req.body
        const newPlayer = await db.query(`INSERT INTO player (login, name, surname) values ($1, $2, $3) RETURNING *`, [login, name, surname]);
        res.json(newPlayer.rows[0]);
    }
    async removeplayer_from_player(req, res) {
        const id = req.params.id;
        const newPlayer = await db.query(`DELETE from player where id = $1`, [id]);
        res.json('Deleted player');
    }
    async getplayer(req, res) {
        const newPlayer = await db.query(`SELECT * from player`);
        res.json(newPlayer.rows);
    }
    async getoneplayer(req, res) {
        const id = req.params.id;
        const newPlayer = await db.query(`SELECT * from player where id = $1`, [id]);
        res.json(newPlayer.rows[0]);
    }
}
module.exports = new PlayerControllerr();