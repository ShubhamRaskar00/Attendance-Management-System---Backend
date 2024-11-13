const Attendance = require("../models/Attendance");

exports.getAttendanceForReport = async (query) => {
    const attendance = await Attendance.find(query).populate("userId");

    return attendance
};
