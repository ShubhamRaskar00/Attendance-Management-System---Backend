const express = require("express");
const auth = require("../middleware/auth");
const {
  getAdminAttendance,
  getAdminAttendanceById,
} = require("../controllers/attendanceController");
const admin = require("../middleware/admin");

const router = express.Router();

// User Authentication Routes
router.get("/attendance", auth, admin, getAdminAttendance);
router.patch("/attendance/:id", auth, admin, getAdminAttendanceById);

module.exports = router;
