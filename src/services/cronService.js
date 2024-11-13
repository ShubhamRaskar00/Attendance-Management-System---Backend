const cron = require("node-cron");
const User = require("../models/User");
const Attendance = require("../models/Attendance");
const mailService = require("./mailService");
const logger = require("../utils/logger");

class CronService {
  constructor() {
    // Schedule checkout reminder - Runs at 6:00 PM every day
    this.checkoutReminder = cron.schedule("0 18 * * *", async () => {
      try {
        await this.sendCheckoutReminders();
      } catch (error) {
        logger.error("Checkout reminder cron error:", error);
      }
    });

    // Schedule attendance reminder - Runs at 9:00 AM every day
    this.attendanceReminder = cron.schedule("0 9 * * *", async () => {
      try {
        
        await this.sendAttendanceReminders();
      } catch (error) {
        logger.error("Attendance reminder cron error:", error);
      }
    });
  }

  async sendCheckoutReminders() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      // Find all employees
      const employees = await User.find({ role: "employee" });

      for (const employee of employees) {
        // Check if employee hasn't checked out
        const attendance = await Attendance.findOne({
          userId: employee._id,
          date: { $gte: today },
          checkOut: { $exists: false },
        });

        if (attendance) {
          await mailService.sendEmail({
            to: employee.email,
            subject: "Checkout Reminder",
            template: "checkoutReminder",
            data: {
              name: employee.name,
              checkInTime: attendance.checkIn,
            },
          });

          logger.info(`Checkout reminder sent to ${employee.email}`);
        }
      }
    } catch (error) {
      logger.error("Error in sendCheckoutReminders:", error);
      throw error;
    }
  }

  async sendAttendanceReminders() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      // Find all employees
      const employees = await User.find({ role: "employee" });

      for (const employee of employees) {
        // Check if employee hasn't marked attendance
        const attendance = await Attendance.findOne({
          userId: employee._id,
          date: { $gte: today },
        });

        if (!attendance) {
          await mailService.sendEmail({
            to: employee.email,
            subject: "Attendance Reminder",
            template: "attendanceReminder",
            data: {
              name: employee.name,
              date: today.toLocaleDateString(),
            },
          });

          logger.info(`Attendance reminder sent to ${employee.email}`);
        }
      }
    } catch (error) {
      logger.error("Error in sendAttendanceReminders:", error);
      throw error;
    }
  }

  // Method to start all cron jobs
  startAllJobs() {
    this.checkoutReminder.start();
    this.attendanceReminder.start();
    logger.info("All cron jobs started");
  }

  // Method to stop all cron jobs
  stopAllJobs() {
    this.checkoutReminder.stop();
    this.attendanceReminder.stop();
    logger.info("All cron jobs stopped");
  }
}

module.exports = new CronService();
