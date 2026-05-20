const mongoose=require("mongoose")

const questionSchema = new mongoose.Schema({
    id: Number,
    text: String,
    options: [String],
    correctIndex: Number,
    category: String
});

const testSchema = new mongoose.Schema({
    testTitle: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true
    },
    questions: [questionSchema],
    attempts: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports= mongoose.model("DCATest", testSchema);