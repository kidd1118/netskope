const connector = require('../../../database/dbConnector');

async function getMovies(Id) {
    const conn = new connector();
  
    const sql = `SELECT * FROM netskope.movies ${Id ? "WHERE Id = " + Id : ""}`;
    const [rows] = await conn.execute(sql);
    const movies = [];
    for (const row in rows) {
        const movie = {};
        for (const col in rows[row]) {
            movie[col.replaceAll(" ", "").replaceAll("%", "")] = rows[row][col];
            //console.log(col, "=", rows[row][col]);
        }
        movies.push(movie);
    }
    return movies;
}

export default async function handler(req, res) {
    const movies = await getMovies(req.query.Id);
    res.status(200).json(movies);
}