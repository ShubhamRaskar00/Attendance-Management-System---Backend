const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  checkIn: { type: Date },
  checkOut: { type: Date },
  workHours: { type: Number },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance