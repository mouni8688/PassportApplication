const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./db");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");



// Routes
const applicantRoutes = require("./routes/applicantRoutes");
const statusRoutes = require("./routes/statusRoutes");

const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));



// Test DB Connection
db.getConnection((err, connection) => {
    if (err) {
        console.log("❌ Database Connection Failed", err);
        return;
    }
    console.log("✅ Database Connected!");
    connection.release();
});

// Register routes
app.use("/api/applicants", applicantRoutes);
app.use("/api/status", statusRoutes);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
