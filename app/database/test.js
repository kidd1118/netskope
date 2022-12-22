const connector = require('./dbConnector');

async function test() {
  const conn = new connector();

  const sql = "SELECT * FROM netskope.movies where `Audience score %` < 40;";
  const [rows] = await conn.execute(sql);

  for (const row in rows)
      for (const col in rows[row])
        console.log(col, "=", rows[row][col]);
}

test();