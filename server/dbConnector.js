var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: '3306',
  user: "root",
  password: "123456",
  database: "netskope"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "SELECT * FROM netskope.movies where `Audience score %` < 40;";
  // con.query(sql, function (err, results) {
  //   if (err) throw err;
  //   for (var i in results)
  //     for (var j in results[i])
  //       console.log("Result: " + j + "=" + results[i][j]);
  // });
});

export default con;