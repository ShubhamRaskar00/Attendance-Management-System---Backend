const Attendance = require("../models/Attendance");
const dateUitls = require("../utils/dateUitls");
const User = require('../models/User')

const createCheckIn = async (userId) => {
  const attendance = new Attendance({
    userId,
    checkIn: new Date(),
  });

  return await attendance.save();
};

const updateCheckOut = async (attendanceId) => {
  const attendance = await Attendance.findById(attendanceId);
  if (!attendance) {
    throw new Error("Attendance record not found");
  }

  attendance.checkOut = new Date();
  attendance.workHours = dateUitls.calcWorkHours(attendance);
  return await attendance.save();
};

const getUser = async (userId) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new Error("User not found");
  }

  return user
}

const getAttendance = async (userId) => {
  const attendance = await Attendance.find({ userId })
    .populate("userId", "name email role")
    .sort({ checkIn: -1 });
  return attendance;
};

const getAdminAttendance = async () => {
  const attendance = await Attendance.find().populate("userId");
  return attendance;
};

const getAdminAttendanceById = async (attendanceId, data) => {
  const attendance = await Attendance.findByIdAndUpdate(attendanceId, data, {
    new: true,
  });
  return await attendance.save();
};

module.exports = {
  createCheckIn,
  updateCheckOut,
  getAdminAttendance,
  getAdminAttendanceById,
  getAttendance,
  getUser,
};
