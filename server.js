const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./db");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const statusRoutes = require("./routes/statusRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static("public"));

// Test DB
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database Connection Failed", err);
        return;
    }
    console.log("✅ Database Connected!");
    connection.release();
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/status", statusRoutes);

// Railway PORT support

app.get("/", (req, res) => {
    res.send("🚀 Passport Application Backend is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
