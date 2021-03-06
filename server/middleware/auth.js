const userService = require("../services/userService");

async function auth(req, res, next) {
  try {
    // Get auth token from query params (GET requests) or body (other methods)
    const { query, body } = req;
    const token = query.authToken || body.authToken || "";
    if (!token) throw new Error("Missing authToken");

    // Get the user ID corresponding to this token
    const userId = await userService.validateAuthToken(token);
    // Add user ID to request object for use everywhere else
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}

module.exports = auth;
