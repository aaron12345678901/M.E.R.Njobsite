// backend/models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    skillsRequired: { type: String, required: true },
});

// Check if the model already exists, if so, use it, otherwise create it
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
