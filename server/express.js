import con from 'dbConnector';

con.query(sql, function (err, results) {
    if (err) throw err;
    for (var i in results)
      for (var j in results[i])
        console.log("Result: " + j + "=" + results[i][j]);
  });