// backend/routes/jobs.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST route to create a new job
router.post("/", async (req, res) => {
    try {
        const { title, excerpt, skillsRequired } = req.body;
        const newJob = new Job({ title, excerpt, skillsRequired });

        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ message: "Failed to add job" });
    }
});

// GET route to fetch all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Failed to fetch jobs" });
    }
});

module.exports = router;