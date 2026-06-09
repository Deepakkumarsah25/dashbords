const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    courseName: {
        type: String,
        required: true,
        trim: true
    },

    courseCategory: {
        type: String,
        required: true,
        trim: true
    },

    courseEnrollments: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);