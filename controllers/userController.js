const User = require("../models/User");

exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required." });

    User.findByEmail(email, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (rows && rows.length > 0) {
            return res.json({ message: "Email already registered." });
        }

        User.register([name, email, password], (err2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json({ message: "Registration failed" });
            }
            res.json({ message: "Registered successfully!" });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (!rows || rows.length === 0)
            return res.json({ message: "User not found" });

        const user = rows[0];

        if (user.password !== password)
            return res.json({ message: "Incorrect password" });

        res.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
};
