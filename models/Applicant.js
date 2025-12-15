const db = require("../db");

const Applicant = {
    create: (data, callback) => {
        const sql = `
            INSERT INTO applicants 
            (application_number, fullname, dob, nationality)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, data, callback);
    },

    findByApplicationNumber: (appNo, callback) => {
        const sql = `SELECT * FROM applicants WHERE application_number = ?`;
        db.query(sql, [appNo], callback);
    }
};

module.exports = Applicant;
