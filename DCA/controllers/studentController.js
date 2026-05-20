const Student = require("../models/Student");

// ➤ GET ALL
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.json(students);

  } catch (error) {

    res.status(500).json({
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

    const exist = await Student.findOne({ mobile });

    if (exist) {
      return res.send("Mobile already exists");
    }

    await Student.create({
      name,
      course,
      mobile,
      amount,
      fee
    });

    res.redirect("/students");

  } catch (error) {

    res.status(500).send(error.message);

  }

};

// ➤ UPDATE
const updateStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const updated = await Student.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true
      }
    );

    if (!updated) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ➤ DELETE
const deleteStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    res.json({
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
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