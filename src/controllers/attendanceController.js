const attendanceService = require("../services/attendanceService");

exports.checkIn = async (req, res) => {
  try {
    const attendance = await attendanceService.createCheckIn(req.user._id);
    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const attendance = await attendanceService.updateCheckOut(req.params.id);
    res.status(200).send(attendance);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await attendanceService.getUser(req.params.id);
    res.status(200).json({
      name: user.name,
      role: user.role,
      email: user.email,
      department: user.department,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendance(req.params.id);

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found." });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAdminAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAdminAttendance();
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAdminAttendanceById = async (req, res) => {
  try {
    const attendance = await attendanceService.getAdminAttendanceById(
      req.params.id,
      req.body
    );
    res.send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};
