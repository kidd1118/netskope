const mysql = require('mysql2/promise');

class dbConnector {
  config;
  connection;
  constructor(config) {
    this.config = config || {
      // host: "127.0.0.1",
      host: "172.30.0.2",
      port: '3306',
      user: "root",
      password: "123456",
      database: "netskope"
    };
  }

  async connect() {
    this.connection = await mysql.createConnection(this.config);
  }

  async execute(sql) {
    const conn = await mysql.createConnection(this.config);
    const [rows, fields] = await conn.execute(sql);
    // console.log("execute!", rows, fields);
    await conn.end();
    return [rows, fields];
  }
}

module.exports = dbConnector;
