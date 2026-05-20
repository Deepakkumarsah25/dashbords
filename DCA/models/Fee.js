const mongoose=require("mongoose")

const feeSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }
}, { timestamps: true });

module.exports= mongoose.model("DCAFee", feeSchema);
