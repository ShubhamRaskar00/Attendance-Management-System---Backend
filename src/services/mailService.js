const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const logger = require("../utils/logger");
const config = require("../config/config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smptHost,
      port: config.smptPort,
      secure: config.smptSecure === "true",
      auth: {
        user: config.smptMail,
        pass: config.smptPassword,
      },
    });
  }

  async sendEmail({ to, subject, template, data }) {
    try {
      // Load email template
      const templatePath = path.join(
        __dirname,
        "../templates/emails",
        `${template}.ejs`
      );
      const html = await ejs.renderFile(templatePath, data);

      // Send email
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
      });

      logger.info(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error("Error sending email:", error);
      throw error;
    }
  }
}

module.exports = new MailService();