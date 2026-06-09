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
    },
    organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true
}
},

{
    timestamps: true
});

module.exports = mongoose.model("DcaCourse", courseSchema);