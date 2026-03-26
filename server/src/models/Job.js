const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    status: String,
    location: String,
    appliedDate: String,
    interviewDate: String,
    offerDate: String,
    rejectedDate: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
