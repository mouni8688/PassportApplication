const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

router.post("/update-status", statusController.updateStatus);
router.get("/track/:application_number", statusController.trackPassport);

module.exports = router;
