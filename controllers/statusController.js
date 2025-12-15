const Status = require("../models/Status");

exports.updateStatus = (req, res) => {
    const { application_number, status } = req.body;

    if (!application_number || !status)
        return res.status(400).json({ message: "Missing required fields." });

    Status.addStatus(application_number, status, (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Status updated successfully!" });
    });
};

exports.trackPassport = (req, res) => {
    const appNo = req.params.application_number;

    Status.getStatusHistory(appNo, (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0)
            return res.status(404).json({ message: "Application not found" });

        res.json(results);
    });
};
