const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./dbconnection");

// Load .env config file. Variables accessible in process.env.VAR_NAME
dotenv.config();

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  const connection = dbConnection.getConnection();
  connection.query("SELECT * FROM user", function (error, results, fields) {
    if (error) throw error;
    // connected!
    console.log(results);
    res.send("Connected");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
