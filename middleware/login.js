const db = require('../db');
module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const {login} = req.body;
        const player_id = await db.query(`SELECT id from player where login = $1`, [login]);
        console.log(player_id);
        if (player_id.rows.length > 0) {
            return res.status(403).json({message: "choose another login"});
        }
        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Enter login"});
    }
};