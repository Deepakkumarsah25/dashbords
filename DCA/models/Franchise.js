const mongoose=require("mongoose")

const franchiseSchema = new mongoose.Schema({

  franchiseName: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  ownerName: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  establishedYear: String,

  licenseType: String,

  licenseCategory: String,

  selectedCourses: [String],

  remarks: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports= mongoose.model("DCAFranchise", franchiseSchema);