const mongoose=require("mongoose")

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  category: { type: String }
}, { timestamps: true });

module.exports= mongoose.model("DCAQuestion", questionSchema);