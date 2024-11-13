const User = require("../models/User");
const reportService = require("../services/reportService");
const csvGenerator = require("../utils/csvGenerator");
const pdfGenerator = require("../utils/pdfGenerator");

exports.generateReport = async (req, res) => {
  try {
    const { startDate, endDate, department, format } = req.body;


    const query = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    if (department) {
      const users = await User.find({ department });
      query.userId = { $in: users.map((user) => user._id) };
    }

    const attendance = await reportService.getAttendanceForReport(query);

    if (format === "pdf") {
      const report = await pdfGenerator.pdfGenerator(attendance);
      res.setHeader("Content-Type", "application/pdf");
      report.pipe(res);
      report.end();
    } else if (format === "csv") {
      const report = csvGenerator.csvGenerator(attendance);
      res.setHeader("Content-Type", "text/csv");
      res.send(report);
    } else {
      res.status(400).json({ error: "Invalid format" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
