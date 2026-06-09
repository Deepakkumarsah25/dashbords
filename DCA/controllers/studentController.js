const Student = require("../models/Student");

// ➤ GET ALL
const getStudents = async (req, res) => {
  try {

    console.log("========== GET STUDENTS ==========");
    console.log("User ID :", req.session?.userId);

    if (!req.session?.userId) {
      return res.status(401).json({
        success: false,
        message: "Login required"
      });
    }

    const students = await Student.find({
      organisationId: req.session.userId
    }).sort({ createdAt: -1 });

    res.json(students);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ➤ ADD
const addStudent = async (req, res) => {

  try {

    const {
      name,
      course,
      mobile,
      amount,
      fee
    } = req.body;

    console.log("========== ADD STUDENT ==========");
    console.log("User ID :", req.session?.userId);

    if (!req.session?.userId) {
      return res.status(401).json({
        success: false,
        message: "Login required"
      });
    }

    if (!name || !course || !mobile || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const exist = await Student.findOne({
      mobile,
      organisationId: req.session.userId
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Mobile already exists"
      });
    }

    const student = await Student.create({
      name,
      course,
      mobile,
      amount: Number(amount),
      fee,
      organisationId: req.session.userId
    });

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      data: student
    });

  } catch (error) {

    console.log("========== STUDENT ERROR ==========");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ➤ UPDATE
const updateStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const updated = await Student.findOneAndUpdate(
      {
        _id: id,
        organisationId: req.session.userId
      },
      req.body,
      {
        new: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ➤ DELETE
const deleteStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const deleted = await Student.findOneAndDelete({
      _id: id,
      organisationId: req.session.userId
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
};