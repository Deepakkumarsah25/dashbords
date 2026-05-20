const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["MCQ", "TF"],
    required: true
  },

  points: {
    type: Number,
    default: 1
  },

  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ]
});

const teacherTestSchema = new mongoose.Schema({

  // CREATED BY
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "creatorModel"
  },

  creatorModel: {
    type: String,
    enum: ["Teacher", "User"],
    required: true
  },

  // TEST DETAILS
  name: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  // THUMBNAIL
  thumbnail: {
    type: String,
    default: ""
  },

  // PUBLIC / PRIVATE
  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "private"
  },

  status: {
    type: String,
    enum: ["pending", "published"],
    default: "pending"
  },

  // STATS
  views: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  // QUESTIONS
  questions: [questionSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("TeacherTest", teacherTestSchema);