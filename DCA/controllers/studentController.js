const Student = require("../models/Student");

// ➤ GET ALL
const getStudents = async (req, res) => {
  try {

    console.log("========== GET STUDENTS ==========");
    console.log("Session :", req.session);
    console.log("User ID :", req.session.userId);

    const students = await Student.find({
      organisationId: req.session.userId,
    });

    res.json(students);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// ➤ ADD
const addStudent = async (req, res) => {
  try {

    const { name, course, mobile, amount, fee } = req.body;

    console.log("========== ADD STUDENT ==========");
    console.log("Adding For User :", req.session.userId);

    const exist = await Student.findOne({
      mobile,
      organisationId: req.session.userId,
    });

    if (exist) {
      return res.send("Mobile already exists");
    }

    await Student.create({
  name,
  course,
  mobile,
  amount,
  fee,
  organisationId: req.session.userId,
});

res.status(201).json({
  message: "Student Added Successfully"
});

  } catch (error) {
    res.status(500).send(error.message);
  }
};
// ➤ UPDATE
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ➤ DELETE
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Student.findOneAndDelete({
      _id: id,
      organisationId: req.session.userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
