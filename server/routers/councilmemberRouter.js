const express = require("express");
const router = express.Router();
const controller = require("../controllers/councilmemberController");

router.post("/nominate", controller.nominate);
router.post("/vote", controller.vote);
router.post("/update", controller.updateProspective);
router.get("/prospective", controller.getProspectives);
router.get("/prospective/:prospectiveUserId", controller.getProspective);

module.exports = router;
