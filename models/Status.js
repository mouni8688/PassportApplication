const db = require("../db");

const Status = {
    addStatus: (appNo, status, callback) => {
        const sql = `
            INSERT INTO passport_status (application_number, status)
            VALUES (?, ?)
        `;
        db.query(sql, [appNo, status], callback);
    },

    getStatusHistory: (appNo, callback) => {
        const sql = `
            SELECT 
                a.fullname, a.passport_number,
                s.status, s.updated_at
            FROM applicants a
            JOIN passport_status s
                ON a.application_number = s.application_number
            WHERE a.application_number = ?
            ORDER BY s.updated_at DESC
        `;
        db.query(sql, [appNo], callback);
    }
};

module.exports = Status;
