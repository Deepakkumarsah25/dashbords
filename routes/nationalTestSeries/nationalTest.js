const express = require("express");
const router = express.Router();
const Test = require("../../models/teacherTestModel");
const User = require("../../models/user"); // 🔥 ADD THIS
const Teacher = require("../../models/Teacher"); // 🔥 ADD THIS
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find({
  status: "published",
  visibility: "public"
})
      .populate({
  path: "createdBy",
  select: "_id name followers"
})
      .sort({ createdAt: -1 });

    res.render("NationalTestSeries/NationalTest", { 
      tests,
      user: res.locals.user
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading tests");
  }
});
router.post("/like/:id", async (req, res) => {
  try {
    const testId = req.params.id;
   const userId = req.session.userId;

    const test = await Test.findById(testId); // ✅ FIXED

    if (!test) {
      return res.status(404).json({ msg: "Test not found" });
    }

    let alreadyLiked = false;

    if (userId) {
      alreadyLiked = test.likedBy.includes(userId);
    }

    if (alreadyLiked) {
      test.likes = Math.max(0, test.likes - 1);
      test.likedBy.pull(userId);
    } else {
      test.likes += 1;
      if (userId) test.likedBy.push(userId);
    }

    await test.save();

    res.json({
      likes: test.likes,
      liked: !alreadyLiked
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});
router.get("/test/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.send("❌ Test not found");
    }

    // ✅ VIEWS
    test.views += 1;  
    await test.save();

    // 🔥 HISTORY SAVE (FINAL FIX)
    const userId = req.session.userId;

    if (userId) {

      // ✅ user me save
      await User.findByIdAndUpdate(userId, {
        $push: {
          viewHistory: {
            test: test._id,
            viewedAt: new Date()
          }
        }
      });

      // ✅ teacher me save
      await Teacher.findByIdAndUpdate(userId, {
  $push: {
    viewHistory: {
      test: test._id,
      viewedAt: new Date()
    }
  }
}, { new: true, upsert: false });

    }
console.log("TEST QUESTIONS:", test.questions);
    res.render("NationalTestSeries/NationalTestPage", {
      questions: test.questions || [],
      testTitle: test.name,
      duration: test.duration || 60,
      testId: test._id,
      user: res.locals.user
    });

  } catch (err) {
    console.log(err);
    res.send("❌ Server Error");
  }
});
router.get("/history", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.send("❌ Please login first");
    }

    let history = [];

    // 🔥 पहले user check
    let user = await User.findById(userId)
      .populate("viewHistory.test");

    if (user && user.viewHistory.length > 0) {
      history = user.viewHistory;
    } else {
      // 🔥 फिर teacher check
      let teacher = await Teacher.findById(userId)
        .populate("viewHistory.test");

      if (teacher) {
        history = teacher.viewHistory;
      }
    }

    // 🔥 null test हटाओ
    history = history.filter(item => item.test);

    res.render("NationalTestSeries/History", {
      history,
      user: res.locals.user
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading history");
  }
});

// ================= DELETE SINGLE HISTORY =================
router.delete("/history/delete/:id", async (req, res) => {
  try {
    const userId = req.session.userId;

    // 🔐 LOGIN CHECK
    if (!userId) {
      return res.status(401).json({ success: false, msg: "Login required" });
    }

    const historyId = req.params.id;

    // ✅ USER se delete
    let user = await User.findById(userId);

    if (user) {
      user.viewHistory = user.viewHistory.filter(
        item => item._id.toString() !== historyId
      );
      await user.save();
    }

    // ✅ TEACHER se delete
    let teacher = await Teacher.findById(userId);

    if (teacher) {
      teacher.viewHistory = teacher.viewHistory.filter(
        item => item._id.toString() !== historyId
      );
      await teacher.save();
    }

    res.json({ success: true });

  } catch (err) {
    console.log("HISTORY DELETE ERROR:", err);
    res.status(500).json({ success: false });
  }
});
// ================= CLEAR ALL HISTORY =================
router.post("/history/clear", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ msg: "Login required" });
    }

    await User.findByIdAndUpdate(userId, { viewHistory: [] });
    await Teacher.findByIdAndUpdate(userId, { viewHistory: [] });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
module.exports = router;