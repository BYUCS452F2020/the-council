const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth")
const controller = require("../controllers/userController");

router.post("/login", controller.login);
router.post("/register", controller.register);
// Only these two user routes need auth tokens
router.post("/logout", authMiddleware, controller.logout);
router.delete("/", authMiddleware, controller.deleteAccount);

module.exports = router;
