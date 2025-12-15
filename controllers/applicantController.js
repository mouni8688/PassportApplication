const Applicant = require("../models/Applicant");
const Status = require("../models/Status");

const createApplicant = (req, res) => {
    const { application_number, fullname, dob, nationality } = req.body;

    if (!application_number || !fullname)
        return res.status(400).json({ message: "Missing required fields." });

    Applicant.create(
        [application_number, fullname, dob, nationality],
        (err) => {
            if (err) return res.status(500).json(err);

            Status.addStatus(application_number, "SUBMITTED", () => {});

            res.json({ message: "Application created successfully!" });
        }
    );
};

module.exports = { createApplicant };
