
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    skillsRequired: { type: String, required: true },
});


const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
