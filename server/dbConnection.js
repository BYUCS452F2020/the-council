const util = require("util");
const mysql = require("mysql");
let connection;
let boundQuery;

function getConnection() {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.SQL_DB_HOST,
      user: process.env.SQL_DB_USER,
      password: process.env.SQL_DB_PASSWORD,
      database: process.env.SQL_DB_NAME,
      ssl: "Amazon RDS",
    });
    console.log("Creating DB connection…");
  }
  if (!boundQuery) {
    boundQuery = util.promisify(connection.query.bind(connection));
  }
  return { query: boundQuery };
}

module.exports = {
  getConnection,
};
