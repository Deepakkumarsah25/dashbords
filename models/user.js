const mongoose = require("mongoose");

// ✅ TEST HISTORY SCHEMA (NO techInterviewCount here)
const testHistorySchema = new mongoose.Schema({
  resultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestResult"
  },
  subject: String,
  setNo: Number,
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

// ✅ MAIN USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    role: String,

    state: String,
    district: String,
    city: String,

    // 🔥 TECH INTERVIEW COUNT
    techInterviewCount: {
      type: Number,
      default: 0
    },

    // ✅ TEST HISTORY (RESULT BASED)
    testHistory: [testHistorySchema],

    // 🔥 ✅ NEW: VIEW HISTORY (USER NE KYA DEKHA)
    viewHistory: [
      {
        test: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TeacherTest"
        },
        viewedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
// 🔥 FOLLOWING (user kis teacher ko follow kar raha hai)

// 🔥 FOLLOWING
following: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "following.model"
    },

    model: {
      type: String,
      enum: ["User", "Teacher"]
    }
  }
],

// 🔥 FOLLOWERS
followers: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "followers.model"
    },

    model: {
      type: String,
      enum: ["User", "Teacher"]
    }
  }
],
    totalTestsAttempted: {
      type: Number,
      default: 0
    },

    averageScore: {
      type: Number,
      default: 0
    },

    otp: String,
    otpExpiry: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);