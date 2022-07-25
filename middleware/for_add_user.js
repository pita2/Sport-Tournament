const db = require('../db');
module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const id = req.params.id;
        const number_of_seats = await db.query(`SELECT number_of_seats from tournament where id = $1`, [id]);
        if (number_of_seats.rows[0].number_of_seats <= 0) {
            return res.status(403).json({message: "no vacancies left"});
        }

        const current_date = new Date();
        const begin_date = await db.query(`SELECT begin_date from tournament where id = $1`, [id]);
        console.log(begin_date.rows[0].begin_date);
        if (current_date < begin_date.rows[0].begin_date) {
            return res.status(403).json({message: "the tournament hasn't started yet"});
        }

        const end_date = await db.query(`SELECT end_date from tournament where id = $1`, [id]);
        if (current_date > end_date.rows[0].end_date) {
            return res.status(403).json({message: "the tournament is over"});
        }

        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Enter token"});
    }
};