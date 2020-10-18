const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./dbConnection");

// Load .env config file. Variables accessible in process.env.VAR_NAME
dotenv.config();

const app = express();
const port = 4000;

// Helmet: various security HTTP headers
const helmet = require("helmet");
app.use(helmet());

// Use JSON bodies for all requests
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Structure: an HTTP request comes to the express server. It gets routed through a router, which calls a controller (service coordination and HTTP logic), which calls one or more services (business logic).

// Middleware that checks for a valid auth token and injects the current user ID into the request
const authMiddleware = require("./middleware/auth");

// Load the API routers
const userRouter = require("./routers/userRouter");
const councilmemberRouter = require("./routers/councilmemberRouter");
const questionRouter = require("./routers/questionRouter");
const answerRouter = require("./routers/answerRouter");

app.use("/user", userRouter);
app.use("/councilmember", authMiddleware, councilmemberRouter);
app.use("/question", authMiddleware, questionRouter);
app.use("/answer", authMiddleware, answerRouter);

app.get("/", (req, res) => {
  res.send(
    "Welcome to The Council! This is just the backend API. Use the mobile app to get started."
  );
});

app.get("/test", async (req, res) => {
  const results = await dbConnection
    .getConnection()
    .query("SELECT email FROM user");
  console.log(results);
  res.send("Connected");
});

// Fallback error handler
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
