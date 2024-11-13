require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const connectWithRetry = require("./src/config/database");
const {
  connectionState,
  checkDatabaseConnection,
  mongoDbConnectionStatus,
} = require("./src/middleware/databaseErrorHandler");
const cronService = require('./src/services/cronService');
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

const app = express();

// Access for added domain only 
app.use(cors());

// upload limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const PORT = config.port;

// Initialize server with database connection
const startServer = async () => {
  try {
    await connectWithRetry(config.mongoUri);
    connectionState.isConnected = true;
    connectionState.lastConnected = new Date();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    cronService.stopAllJobs();
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Monitor DB event
mongoDbConnectionStatus();

// Check data base connection and get back the result
app.use(checkDatabaseConnection);

cronService.startAllJobs();

// app routes
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/admin", adminRoutes);
app.use("/v1/api/attendance", attendanceRoutes);
app.use("/v1/api/report", reportRoutes);

// start server
startServer();
