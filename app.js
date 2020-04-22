const express = require("express");
const app = express();

// Middleware - Imports
const logs = require("./middleware/logs");

// Route - Imports
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");

/**
 * Middleware
 */

// Parsing request.body
app.use(express.json());
app.use("/api", logs);

/**
 * Routes
 */
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);

module.exports = app;
