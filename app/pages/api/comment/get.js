const connector = require('../../../database/dbConnector');

async function getComments(mId) {
    const conn = new connector();
  
    const sql = `SELECT * FROM netskope.comments ${mId ? "WHERE mId = " + mId : ""}`;

    const [rows] = await conn.execute(sql);
    const comments = [];
    for (const row in rows) {
        const comment = {};
        for (const col in rows[row]) {
            comment[col] = rows[row][col];
            //console.log(col, "=", rows[row][col]);
        }
        comments.push(comment);
    }
    return comments;
}

export default async function handler(req, res) {
    const movies = await getComments(req.query.mId);
    res.status(200).json(movies);
}