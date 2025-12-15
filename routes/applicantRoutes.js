const express = require("express");
const router = express.Router();
const applicantController = require("../controllers/applicantController");
console.log("APPLICANT CONTROLLER:", applicantController);

router.post("/apply", applicantController.createApplicant);


module.exports = router;
