const express = require("express");
const router = express.Router();
const controller = require("../controllers/answerController");

router.get("/question/:questionId", controller.getByQuestion);
router.post("/", controller.create);
router.post("/:answerId", controller.update);
router.delete("/:answerId", controller.deleteAnswer);
router.get("/:answerId", controller.getById);

module.exports = router;
