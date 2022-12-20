const connector = require('../../database/dbConnector');

async function getMovies() {
    const conn = new connector();
  
    const sql = "SELECT * FROM netskope.movies";
    const [rows] = await conn.execute(sql);
    const movies = [];
    for (const row in rows) {
        const movie = {};
        for (const col in rows[row]) {
            movie[col.replaceAll(" ", "")] = rows[row][col];
            //console.log(col, "=", rows[row][col]);
        }
        movies.push(movie);
    }
    return movies;
}

export default async function handler(req, res) {
    const movies = await getMovies();
    res.status(200).json(movies);
}