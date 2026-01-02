const Applicant = require("../models/Applicant");
const Status = require("../models/Status");

/**
 * Generate Application Number
 * PAS-<FIRST2>-<YYMMDD>-<RANDOM4>
 * Example: PAS-KU-251230-4832
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
    const { user_id, fullname, dob, nationality } = req.body;

    // ✅ Mandatory validation
    if (!user_id || !fullname || !dob || !nationality) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    // 🚫 One user → one application
    Applicant.findByUserId(user_id, (err, rows) => {
        if (err) {
            console.error("FIND ERROR:", err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (rows.length > 0) {
            return res.status(400).json({
                message: "You have already applied for a passport."
            });
        }

        // ✅ Generate application number
        const application_number = generateApplicationNumber(fullname, dob);

        // ✅ Insert application
        Applicant.create(
            [user_id, application_number, fullname, dob, nationality],
            (err2) => {
                if (err2) {
                    console.error("INSERT ERROR:", err2);
                    return res.status(500).json({
                        message: "Database error while creating application"
                    });
                }

                // ✅ Initial status
                Status.addStatus(application_number, "SUBMITTED", () => {});

                res.json({
                    message: "Application submitted successfully!",
                    application_number
                });
            }
        );
    });
};

module.exports = { createApplicant };
