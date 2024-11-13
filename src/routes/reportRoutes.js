const express = require("express");
const auth = require("../middleware/auth");

const admin = require("../middleware/admin");
const { generateReport } = require("../controllers/reportController");

const router = express.Router();

// User Authentication Routes
router.post("/generate", auth, admin, generateReport);

module.exports = router;
