const db = require("../db");

const Applicant = {
    create: (data, callback) => {
        const sql = `
            INSERT INTO applicants 
            (user_id, application_number, fullname, dob, nationality)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, data, callback);
    },

    findByUserId: (userId, callback) => {
        const sql = `SELECT * FROM applicants WHERE user_id = ?`;
        db.query(sql, [userId], callback);
    }
};

module.exports = Applicant;
