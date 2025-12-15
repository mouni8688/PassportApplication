const Admin = require("../models/Admin");

exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;

    Admin.findByEmail(email, (err, rows) => {
        if (rows.length === 0)
            return res.json({ message: "Admin not found" });

        const admin = rows[0];

        if (admin.password !== password)
            return res.json({ message: "Wrong password" });

        res.json({
            success: true,
            admin: { id: admin.id, email: admin.email }
        });
    });
};
