const db = require("../db");

const Admin = {
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM admin WHERE email = ?`;
        db.query(sql, [email], callback);
    }
};

module.exports = Admin;
