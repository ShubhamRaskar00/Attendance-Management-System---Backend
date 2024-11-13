const express = require("express");
const auth = require("../middleware/auth");
const { checkIn, checkOut, getAttendance, getUser } = require("../controllers/attendanceController");

const router = express.Router();

// User Authentication Routes
router.get("/getuser/:id", getUser)
router.get("/getattendence/:id", auth, getAttendance)
router.post("/checkin", auth, checkIn);
router.patch("/checkout/:id", auth, checkOut);

module.exports = router;