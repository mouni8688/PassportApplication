const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mouni@000",
    database: "passport"
});

module.exports = db;
