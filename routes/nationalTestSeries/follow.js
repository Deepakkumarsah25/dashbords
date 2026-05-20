const express = require("express");
const router = express.Router();

const Teacher = require("../../models/Teacher");
const User = require("../../models/user");
const TeacherTest = require("../../models/teacherTestModel");


// ================= FOLLOW / UNFOLLOW =================
router.post("/follow/:targetId", async (req, res) => {

  try {

    const userId = req.session.userId;
    const targetId = req.params.targetId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        msg: "Login required"
      });
    }

    // ❌ self follow block
    if (userId.toString() === targetId.toString()) {
      return res.json({
        success: false,
        msg: "You cannot follow yourself"
      });
    }

    // ================= CURRENT USER =================
    let currentUser = await User.findById(userId);
    let currentModel = "User";

    if (!currentUser) {
      currentUser = await Teacher.findById(userId);
      currentModel = "Teacher";
    }

    // ================= TARGET USER =================
    let targetUser = await User.findById(targetId);
    let targetModel = "User";

    if (!targetUser) {
      targetUser = await Teacher.findById(targetId);
      targetModel = "Teacher";
    }

    if (!currentUser || !targetUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    // ================= SAFE INIT =================
    currentUser.following =
      currentUser.following || [];

    targetUser.followers =
      targetUser.followers || [];

    // ================= CHECK FOLLOW =================
    const alreadyFollow =
  targetUser.followers.some(
    f => f.user && f.user.toString() === userId.toString()
  );
    // ================= UNFOLLOW =================
    if (alreadyFollow) {

      targetUser.followers =
  targetUser.followers.filter(
    f => f.user && f.user.toString() !== userId.toString()
  );

      currentUser.following =
  currentUser.following.filter(
    f => f.user && f.user.toString() !== targetId.toString()
  );

    }

    // ================= FOLLOW =================
    else {

    // prevent duplicate followers
if (
  !targetUser.followers.some(
   f => f.user && f.user.toString() === userId.toString()
  )
) {
  targetUser.followers.push({
  user: userId,
  model: currentModel
});
}

// prevent duplicate following
if (
  !currentUser.following.some(
    id => id.toString() === targetId.toString()
  )
) {
  currentUser.following.push({
  user: targetId,
  model: targetModel
});
}

    }

    // ================= SAVE =================
    await currentUser.save();
    await targetUser.save();

    res.json({
      success: true,
      following: !alreadyFollow,
      followersCount: targetUser.followers.length
    });

  }

  catch (err) {

    console.log("FOLLOW ERROR:", err);

    res.status(500).json({
      success: false
    });

  }

});


// ================= MY FOLLOWERS PAGE =================
router.get("/teacher/followers", async (req, res) => {

  try {

    const userId = req.session.userId;

    let profileUser =
      await Teacher.findById(userId)
       .populate("followers.user")
.populate("following.user")

    if (!profileUser) {

      profileUser =
        await User.findById(userId)
         .populate("followers.user")
.populate("following.user")

    }

    if (!profileUser) {
      return res.send("User not found ❌");
    }

    res.render(
      "NationalTestSeries/Follower/FollowerTeacher",
      {
        teacher: profileUser,
        followers: profileUser.followers || [],
        following: profileUser.following || [],
        tests: []
      }
    );

  }

  catch (err) {

    console.log(err);

    res.send("Error");

  }

});


// ================= PROFILE PAGE =================
router.get("/profile/:id", async (req, res) => {

  try {

    const profileId = req.params.id;

    // ================= FIND PROFILE =================
    let profileUser =
      await Teacher.findById(profileId)
        .populate("followers.user")
.populate("following.user")

    if (!profileUser) {

      profileUser =
        await User.findById(profileId)
          .populate("followers.user")
.populate("following.user")

    }

    if (!profileUser) {
      return res.send("User not found ❌");
    }

    // ================= TESTS =================
    const tests =
      await TeacherTest.find({
        createdBy: profileId
      }).sort({ createdAt: -1 });

    // ================= IS FOLLOWING =================
    const loggedUserId = req.session.userId;

    let isFollowing = false;

    if (loggedUserId) {

      isFollowing =
        profileUser.followers.some(
          id => id._id.toString() === loggedUserId.toString()
        );

    }

    // ================= RENDER =================
    res.render(
      "NationalTestSeries/Follower/FollowerTeacher",
      {
        teacher: profileUser,
        followers: profileUser.followers || [],
        following: profileUser.following || [],
        tests,
        isFollowing
      }
    );

  }

  catch (err) {

    console.log("PROFILE ERROR:", err);

    res.send("Error");

  }

});

module.exports = router;