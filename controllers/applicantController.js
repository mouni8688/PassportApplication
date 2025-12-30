const Applicant = require("../models/Applicant");
const Status = require("../models/Status");

/**
 * Generate Application Number
 * Format: PAS-<FIRST2NAME>-<YYMMDD>-<RANDOM4>
 * Example: PAS-MO-020615-4832
 */
function generateApplicationNumber(fullname, dob) {
    const prefix = "PAS";

    const namePart = fullname.substring(0, 2).toUpperCase();

    const date = new Date(dob);
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${namePart}-${yy}${mm}${dd}-${randomPart}`;
}

const createApplicant = (req, res) => {
    const { fullname, dob, nationality } = req.body;

    // ✅ Mandatory validation
    if (!fullname || !dob || !nationality) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    // ✅ Auto-generate application number
    const application_number = generateApplicationNumber(fullname, dob);

    Applicant.create(
        [application_number, fullname, dob, nationality],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Database error while creating application"
                });
            }

            // ✅ Add default status
            Status.addStatus(application_number, "SUBMITTED", () => {});

            // ✅ Send response to frontend
            res.json({
                message: "Application submitted successfully!",
                application_number
            });
        }
    );
};

module.exports = { createApplicant };
