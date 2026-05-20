const express = require("express");
const router = express.Router();

const {
  addCertificate,
  getRegistrationsCount,
  getAdminCount,
  getStudentCount,
  getTeacherCount,
  getOrganisationCount,
  getEbooksCount,
  getPdfsCount,
} = require("../controllers/adminController");

const multer = require("multer");

// ✅ CORRECT MIDDLEWARE
const verifyToken = require("../middleware/verifyToken");
const requireAdmin = require("../middleware/requireAdmin");

const User = require("../models/user");
const Teacher = require("../models/Teacher");
const Lead = require("../models/Lead");

const storage = multer.memoryStorage();
const upload = multer({ storage });


// ================= ROUTES =================

const TestRequest = require("../models/TestRequest");



router.post("/upload", upload.single("certificate"), addCertificate);

router.get("/registrations/count", getRegistrationsCount);
router.get("/admin-count", getAdminCount);
router.get("/pdf-Count", getPdfsCount);
router.get("/student-count", getStudentCount);
router.get("/teacher-count", getTeacherCount);
router.get("/organisation-count", getOrganisationCount);
router.get("/ebooks/count", getEbooksCount);

// ================= USERS =================

router.get("/users", verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "email role gender name dob lastname");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/search-user", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email }, "email role");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/change-role", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { email, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= ADMINS =================

router.get("/all-admins", verifyToken, requireAdmin, async (req, res) => {
  try {
    const admins = await User.find(
      { role: "admin" },
      "email role name lastname gender createdAt"
    );

    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/count-admins", async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "admin" });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin count" });
  }
});

// ================= LEADS =================

router.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= TEACHERS (FINAL FIX) =================

router.get("/teachers", async (req, res) => {
  try {

    // ✅ all teachers
    const teachers = await Teacher.find().lean();

    // ✅ users who created tests
    const creatorUserIds = await TeacherTest.find({
      creatorModel: "User"
    }).distinct("createdBy");

    // ✅ only test creator users
    const users = await User.find({
      _id: { $in: creatorUserIds }
    }).lean();

    // ✅ combine both
    const allCreators = [
      ...teachers,
      ...users
    ];

    // ✅ remove duplicate ids
    const uniqueCreators = allCreators.filter(
      (item, index, self) =>
        index === self.findIndex(
          t => t._id.toString() === item._id.toString()
        )
    );

    res.json(uniqueCreators);

  } catch (error) {

    console.log("TEACHER ROUTE ERROR:", error);

    res.status(500).json([]);

  }
});


const TeacherTest = require("../models/teacherTestModel");

// ✅ PAGE OPEN KARNE KE LIYE
router.get("/teacher-tests-page/:teacherId", async (req, res) => {
  try {

    const { teacherId } = req.params;

    // ✅ first Teacher check
    let teacher = await Teacher.findById(teacherId);

    let creatorModel = "Teacher";

    // ✅ if not teacher then user
    if (!teacher) {
      teacher = await User.findById(teacherId);
      creatorModel = "User";
    }

    if (!teacher) {
      return res.status(404).send("User not found");
    }

    // ✅ CORRECT QUERY
    const tests = await TeacherTest.find({
      createdBy: teacher._id,
      creatorModel: creatorModel
    });

    console.log("FOUND TESTS:", tests);

    res.render("Admin/teachertestcards/testcards", {
      teacher,
      tests
    });

  } catch (err) {

    console.log("TEST PAGE ERROR:", err);

    res.status(500).send("Error loading tests");

  }
});

router.get("/test-requests", async (req, res) => {
  const requests = await TestRequest.find({ status: "pending" })
    .populate("teacherId");

  res.render("admin/test-requests", { requests });
});

router.post("/approve-request", async (req, res) => {
  try {
    const { id, questions } = req.body;

    const request = await TestRequest.findById(id);

    // 🔥 text → array
   const questionArray = questions.split("\n").map(line => {

  const parts = line.split("|");

  const questionText = parts[0];
  const correctIndex = parseInt(parts[parts.length - 1]) - 1;

  const options = parts.slice(1, -1).map((opt, i) => ({
    text: opt,
    isCorrect: i === correctIndex
  }));

  return {
    text: questionText,
    type: "multiple-choice",
    difficulty: "easy",
    points: 1,
    options
  };
});

    // 🔥 create test
  const newTest = new TeacherTest({
  teacher: request.teacherId,
  name: "Admin Created Test",
  subject: "Auto",
  duration: 30,
  difficulty: "easy",
  description: request.description,

  questions: questionArray
});

    await newTest.save();

    request.status = "approved";
    request.questionsText = questions;

    await request.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.get("/test-requests-data", async (req, res) => {
  try {
    const requests = await TestRequest.find({ status: "pending" })
      .populate("teacherId");

    res.json(requests);

  } catch (err) {
    console.log(err);
    res.json([]);
  }
});

module.exports = router;