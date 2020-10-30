const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionController");

router.get("/", controller.getAll);
router.get("/user/:userId", controller.getByUser);
router.post("/", controller.create);
router.post("/:questionId", controller.update);
router.delete("/:questionId", controller.deleteQuestion);
router.get("/:questionId", controller.getById);

module.exports = router;
