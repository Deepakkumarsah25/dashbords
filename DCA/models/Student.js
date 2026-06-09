const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },

    course: {
        type: String,
        required: true,
        trim: true,
    },

    mobile: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 1,
    },

    fee: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending",
    },

    // Login DCA User
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation",
        required: true
    }

},
{ timestamps: true }
);

module.exports = mongoose.model("DCAStudentDetail", studentSchema);