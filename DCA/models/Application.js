// import mongoose from "mongoose";
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // Applicant Details

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Student Details

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    admissionDate: {
      type: Date,
      required: true,
    },

    completionDate: {
      type: Date,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

  grade: {
  type: String,
  required: true,
  enum: [
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D",
    "F"
  ]
},
    // Auto Generated Numbers

    certificateNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

registrationNo: {
    type: String,
    trim: true
},
    enrollNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Photo URL

    photoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Certificate Info

    issueDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DCACertificatedApplication",
  applicationSchema
);