const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ensureTeacher = require("../middleware/authMiddleware"); // ✅ ADD THIS
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Message = require("../models/Message");
const sendMail = require("../utils/sendMail");
const Test = require("../models/Test");       // ✅ ALSO ADD
const Question = require("../models/Question"); // ✅ ALSO ADD
const ClassModel = require("../models/Class");

const TeacherTest = require("../models/teacherTestModel");

const TestRequest = require("../models/TestRequest");
const multer = require("multer");


// ================= DASHBOARD =================

router.get("/teacher-dashboard", ensureTeacher, async (req, res) => {

  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const teacher = await Teacher.findById(decoded.userId);
    if (!teacher) return res.redirect("/login");

    const students = await Student.find({ teacherId: teacher._id });
    
    res.render("tracher_deshboard/advance-version/teacher-test-version", { teacher, students });

  } catch (err) {
    console.log("Teacher Dashboard Error:", err);
    res.redirect("/login");
  }
});

// ================= PROFILE UPDATE =================
router.post("/teacher/update-profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await Teacher.findByIdAndUpdate(decoded.userId, req.body);

    res.json({ success: true });
  } catch (err) {
    console.log("Profile Update Error:", err);
    res.json({ success: false });
  }
});

// ================= ADD STUDENT =================
router.post("/teacher/add-student", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newStudent = new Student({
      teacherId: decoded.userId,
      name: `${req.body.firstName || ''} ${req.body.lastName || ''}`.trim(),
      email: req.body.email || '',
      class: req.body.className || req.body.class || '',
      roll: req.body.roll || '',
      parentContact: req.body.parentContact || ''
    });

    await newStudent.save();
    res.json({ success: true, student: newStudent });

  } catch (err) {
    console.log("Add Student Error:", err);
    res.json({ success: false });
  }
});




// ================= DELETE STUDENT =================
router.delete("/teacher/delete-student/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log("Delete Student Error:", err);
    res.json({ success: false });
  }
});

// ================= UPDATE STUDENT =================
router.put("/teacher/update-student/:id", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const updateData = {
      name: `${req.body.firstName || ''} ${req.body.lastName || ''}`.trim(),
      email: req.body.email || '',
      class: req.body.className || req.body.class || '',
      roll: req.body.roll || '',
      parentContact: req.body.parentContact || ''
    };

    const updated = await Student.findOneAndUpdate(
      { _id: req.params.id, teacherId: decoded.userId },
      updateData,
      { new: true }
    );

    if(!updated) return res.json({ success:false });

    res.json({ success:true, student: updated });

  } catch (err) {
    console.log("Update Student Error:", err);
    res.json({ success:false });
  }
});

// ================= SEND MESSAGE =================


// ===== SEND MESSAGE =====
router.post("/teacher/send-message", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save message in DB
    const newMsg = new Message({
      teacherId: decoded.userId,
      studentId: req.body.studentId,
      sender: "teacher",
      text: req.body.text
    });
    await newMsg.save();

    // Get student email
    const student = await Student.findById(req.body.studentId);

    // Send Email (optional)
    await sendMail(
      student.email,
      "New Message From Teacher",
      `Hello ${student.name},\n\n${req.body.text}\n\n- Teacher`
    );

    res.json({ success: true });

  } catch (err) {
    console.log("Send Message Error:", err);
    res.json({ success: false });
  }
});

// ================= GET MESSAGES =================
router.get("/teacher/messages/:studentId", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const messages = await Message.find({
      teacherId: decoded.userId,
      studentId: req.params.studentId
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.log("Get Message Error:", err);
    res.json([]);
  }
});

// ===== GET CONVERSATION LIST =====
// ===== GET Conversation List =====
router.get("/teacher/conversations", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // last message per student
    const conversations = await Message.aggregate([
      { $match: { teacherId: new mongoose.Types.ObjectId(decoded.userId) } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$studentId",
          lastMessage: { $first: "$text" },
          lastTime: { $first: "$createdAt" }
        }
      }
    ]);

    // attach student info
    const populated = await Student.populate(conversations, {
      path: "_id",
      select: "name"
    });

    res.json(populated);
  } catch (err) {
    console.log("Conversation Load Error:", err);
    res.json([]);
  }
});


// Send Test Logic
// Send Test Page Route
// ================= SEND TEST PAGE =================
router.get("/teacher/send-test-link/:testId", ensureTeacher, async (req, res) => {
  const test = await Test.findById(req.params.testId);
  const publicLink = `${req.protocol}://${req.get("host")}/student/start-test/${test._id}`;
  res.json({ success:true, link: publicLink });
});

// ================= SEND TEST PAGE =================
router.get("/teacher/send-test-page/:testId", ensureTeacher, async (req,res)=>{
  const test = await Test.findById(req.params.testId);
  if(!test) return res.send("Test Not Found");

  // ✅ Correct public link
  const publicLink = `${req.protocol}://${req.get("host")}/student/start-test/${test._id}`;

  res.render("tracher_deshboard/sendTestPage", {
     test,
     publicLink
  });
});
router.get("/teacher/my-tests", ensureTeacher, async (req, res) => {
  try {
    const tests = await Test.find({
      $or: [
        { teacherId: req.user._id },
        { teacherId: { $exists: false } } // fallback for old tests
      ]
    }).sort({ createdAt: -1 });

    const fullTests = await Promise.all(
      tests.map(async (test) => {
        const questions = await Question.find({ testId: test._id });
        const attemptCount = await require("../models/TestAttempt")
          .countDocuments({ testId: test._id });

        return {
          ...test.toObject(),
          questions,
          submissions: attemptCount,
          startDate: test.startDate,
          endDate: test.endDate
        };
      })
    );

    res.json(fullTests);

  } catch (err) {
    console.log("Load Tests Error:", err);
    res.json([]);
  }
});

router.get("/teacher/fix-test/:testId", async (req,res)=>{
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  await Test.findByIdAndUpdate(req.params.testId, {
    teacherId: decoded.userId
  });

  res.send("Test fixed successfully");
});

// ================= CREATE TEST =================
router.post("/teacher/create-test", ensureTeacher, async (req, res) => {
  try {
    const { title, subject, className, duration, totalMarks, instructions, startDate, endDate, questions } = req.body;


    // 1️⃣ Save Test
    const newTest = new Test({
  title,
  subject,
  className,
  duration,
  totalMarks,
  instructions,
  startDate,
  endDate,
  teacherId: req.user._id   
  
});



    await newTest.save();

    // 2️⃣ Save all Questions
   const questionDocs = questions.map(q => ({
  testId: newTest._id,
  type: q.type || "mcq",
  text: q.text,
  points: q.points || 1,

  options: (q.options || []).map(opt => ({
    text: opt.text || opt,
    isCorrect: opt.isCorrect || false
  }))
}));

    await Question.insertMany(questionDocs);

    res.json({ success: true });

  } catch (err) {
    console.log("Create Test Error:", err);
    res.json({ success: false });
  }
});


// ================= VIEW TEST (Teacher Preview) =================
router.get("/teacher/view-test/:testId", ensureTeacher, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) return res.send("Test Not Found");

    // Load questions from Question collection
    const dbQuestions = await Question.find({ testId: test._id });
    // console.log("Received Questions From DB:", dbQuestions.length);

    // Format questions for student test page
    const formattedQuestions = dbQuestions.map((q, index) => ({
  num: index + 1,
  question_en: q.text,
  question_hi: q.text,

  options_en: q.options.map(o => o.text),
  options_hi: q.options.map(o => o.text),

  answer_en: q.options.find(o => o.isCorrect)?.text || "",
  answer_hi: q.options.find(o => o.isCorrect)?.text || "",

  points: q.points || 1,
  attempted: false,
  selected: ""
}));

    // Render test page with formatted questions
res.render("tracher_deshboard/viewtext", {
  testTitle: test.title,
  questions: formattedQuestions,
  duration: test.duration,
  testId: test._id,
  sid: ""   // teacher preview → no student id
});

  } catch (err) {
    console.log("View Test Error:", err);
    res.send("Error loading test");
  }
});

// ================= DELETE TEST =================
router.delete("/teacher/delete-test/:testId", ensureTeacher, async (req, res) => {
  try {
    const testId = req.params.testId;

    // Delete questions first
    await Question.deleteMany({ testId });

    // Delete test
    await Test.findByIdAndDelete(testId);

    res.json({ success: true });
  } catch (err) {
    console.log("Delete Test Error:", err);
    res.json({ success: false });
  }
});

// ================= UPDATE TEST =================
router.put("/teacher/update-test/:testId", ensureTeacher, async (req, res) => {
  try {
    const { title, subject, className, duration, totalMarks, instructions, startDate, endDate, questions } = req.body;


    // Update Test basic info
    await Test.findByIdAndUpdate(req.params.testId, {
      title, subject, className, duration, totalMarks, instructions,
      startDate,   // ✅ ADD
      endDate      // ✅ ADD
    });


    // Remove old questions
    await Question.deleteMany({ testId: req.params.testId });

    // Insert new questions
   const questionDocs = questions.map(q => ({
  testId: newTest._id,
  type: q.type || "mcq",
  text: q.text,
  points: q.points || 1,

  options: (q.options || []).map(opt => ({
    text: opt.text || opt,
    isCorrect: opt.isCorrect || false
  }))
}));

    await Question.insertMany(questionDocs);

    res.json({ success: true });
  } catch (err) {
    console.log("Update Test Error:", err);
    res.json({ success: false });
  }
});

// create class routes 
router.post("/teacher/create-class", ensureTeacher, async (req,res)=>{
  try{
    // console.log("Logged Teacher:", req.user._id); // 👈 test log

    const newClass = new ClassModel({
      teacherId: req.user._id,   // ✅ now always defined
      name: req.body.name
    });

    await newClass.save();
    res.json({success:true});

  }catch(err){
    console.log("Create Class Error:", err);
    res.json({success:false});
  }
});
router.get("/teacher/classes", ensureTeacher, async (req,res)=>{
  try {
    const classes = await ClassModel.find({ teacherId: req.user._id });
    res.json(classes);
  } catch(err){
    res.json([]);
  }
});

router.get("/teacher/analytics", ensureTeacher, (req, res) => {
  res.render("tracher_deshboard/analytics", {
    teacher: req.user   // optional but useful
  });
});
// ================= UPDATE CLASS =================
router.put("/teacher/update-class/:id", ensureTeacher, async (req, res) => {
  try {
    const oldClass = await ClassModel.findOne({
      _id: req.params.id,
      teacherId: req.user._id
    });

    if (!oldClass) return res.json({ success: false });

    // 🔥 update students also
   await Student.updateMany(
  { teacherId: req.user._id, class: deleted.name },
  { $set: { class: "Unassigned" } }
);

    oldClass.name = req.body.name;
    await oldClass.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

// ================= DELETE CLASS =================
router.delete("/teacher/delete-class/:id", ensureTeacher, async (req, res) => {
  try {
    const deleted = await ClassModel.findOneAndDelete({
      _id: req.params.id,
      teacherId: req.user._id
    });

    if (!deleted) return res.json({ success: false });

    res.json({ success: true });
  } catch (err) {
    console.log("Delete Class Error:", err);
    res.json({ success: false });
  }
});
//upload profile
// router.post(
//   "/upload-profile",
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const teacherId = req.user.id; // ya session id

//       const teacher = await Teacher.findById(teacherId);
//       teacher.profileImage = "/uploads/profile/" + req.file.filename;

//       await teacher.save();

//       res.json({
//         success: true,
//         image: teacher.profileImage
//       });
//     } catch (err) {
//       console.log(err);
//       res.json({ success: false });
//     }
//   }
// );
router.get("/advance-version", ensureTeacher, async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const teacher = await Teacher.findById(decoded.userId);
    if (!teacher) return res.redirect("/login");

    res.render("tracher_deshboard/advance-version/teacher-test-version", {
      teacher
    });

  } catch (err) {
    console.log("Advance Dashboard Error:", err);
    res.redirect("/login");
  }
});
// All india test show the teacher this routes 
// 🔥 TEACHER CHANNEL (View Your Channel)
router.get("/teacher/channel", ensureTeacher, async (req, res) => {
  try {

router.post("/teacher/send-request", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);

    const newRequest = new TestRequest({
      teacherId: decoded.userId,
      banner: req.body.banner,
      notes: req.body.notes,
      description: req.body.description
    });

    await newRequest.save();

    res.json({ success: true });

  } catch (err) {
    console.log("Send Request Error:", err);
    res.json({ success: false });
  }
});

const storage = multer.diskStorage({ 
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/send-request", upload.single("banner"), async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);

    const newRequest = new TestRequest({
      teacherId: decoded.userId,
      banner: req.file ? "/uploads/" + req.file.filename : "",
      notes: req.body.notes,
      description: req.body.description
    });

    await newRequest.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

router.put("/api/update-test/:id", async (req, res) => {
    try {
        const updated = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ success: true, test: updated });
    } catch (err) {
        res.json({ success: false });
    }
});

// Show student registration page
router.get('/student-register/:teacherId', (req, res) => {
    res.render('tracher_deshboard/advance-version/student-register', {
        teacherId: req.params.teacherId
    });
});

router.post('/student-register', async (req, res) => {

    const { name, class: className, roll, email, parentContact, teacherId } = req.body;

    try {
        await Student.create({
            name,
            class: className,
            roll,
            email,
            parentContact,

            // ✅ YAHI FIX
            teacherId: teacherId
        });

        res.send("Registration Successful ✅");

    } catch (err) {
        console.log(err);
        res.send("Error ❌");
    }
});


   const tests = await TeacherTest.find({
  teacher: req.user._id
}).sort({ createdAt: -1 });

    res.render("NationalTestSeries/teacher/channel", { tests });

  } catch (err) {
    console.log("Channel Error:", err);
    res.send("Error loading channel");
  }
});
router.get("/teacher/:id", async (req, res) => {

    const questions = await Question.aggregate([
        {
            $lookup: {
                from: "tests",
                localField: "testId",
                foreignField: "_id",
                as: "test"
            }
        },
        { $unwind: "$test" },

        {
            $lookup: {
                from: "teachers",
                localField: "test.teacherId",
                foreignField: "_id",
                as: "teacher"
            }
        },
        { $unwind: "$teacher" },

        {
            $match: { "teacher._id": new mongoose.Types.ObjectId(req.params.id) }
        }
    ]);

    res.render("teacherProfile", { questions });
});

// ✅ multer setup top-level pe rakho
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// ✅ route ko router.get("/teacher/channel") ke bahar rakho
router.post(
  "/teacher/send-request",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "notes", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);

      const bannerFile = req.files?.banner?.[0];
      const notesFile = req.files?.notes?.[0];

      const newRequest = new TestRequest({
        teacherId: decoded.userId,
        banner: bannerFile ? "/uploads/" + bannerFile.filename : "",
        notes: notesFile ? "/uploads/" + notesFile.filename : "",
        description: req.body.description || ""
      });

      await newRequest.save();
      res.json({ success: true });
    } catch (err) {
      console.log("Send Request Error:", err);
      res.json({ success: false, error: err.message });
    }
  }
);


// public test on all india test 

router.put("/teacher-tests/publish/:id", async (req, res) => {

    try {

        await Test.findByIdAndUpdate(req.params.id, {

            visibility: "public",
            status: "published"

        });

        res.json({
            success: true
        });

    } catch (err) {

        console.log(err);

        res.json({
            success: false,
            error: "Publish failed"
        });
    }
});
module.exports = router;
