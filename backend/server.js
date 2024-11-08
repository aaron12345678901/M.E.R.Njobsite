const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs"); // Import the jobs routes
const userRoutes = require("./routes/users");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Use the authentication routes
app.use("/api/auth", authRoutes);

// Use the job routes for job-related API requests
app.use("/api/jobs", jobRoutes); // Add this line for the job API

app.use("/api/users", userRoutes); // Endpoint for user-related API requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));