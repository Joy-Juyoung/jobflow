const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

function handleMongooseError(error, res, fallbackMessage) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(error.errors).map((err) => err.message),
    });
  }

  return res.status(500).json({ message: fallbackMessage });
}

router.get("/", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newJob = await Job.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(newJob);
  } catch (error) {
    handleMongooseError(error, res, "Failed to create job");
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const updatedJob = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    handleMongooseError(error, res, "Failed to update job");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const deletedJob = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

module.exports = router;
