const db = require("../db");

const User = {
    register: (data, callback) => {
        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;
        db.query(sql, data, callback);
    },

    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], callback);
    }
};

module.exports = User;
