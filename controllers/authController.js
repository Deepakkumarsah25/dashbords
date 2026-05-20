const User = require("../models/user");
const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");

// const {jwtAuthMiddleware, generateToken} = require("../utils/jwt")
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");
const { storeOTP, validateOTP, findUserByEmail } = require("../utils/otpUtils");
// authController.js
exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  email = email.toLowerCase().trim();



  try {
    // 🔹 Check in all collections
    let user = await User.findOne({ email });

    if (!user) {
      const Teacher = require("../models/Teacher");
      user = await Teacher.findOne({ email });
    }

    if (!user) {
      const Organisation = require("../models/Organisation");
      user = await Organisation.findOne({ email });
    }

    // 🔹 User not found
    if (!user) {
      return res.send("Invalid email or password");
    }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Invalid email or password");
    }

    // 🔹 Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    // 🔹 Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // local development
      maxAge: 3600000,
    });
// 🔥 SESSION SAVE
req.session.userId = user._id;
req.session.userRole = user.role;
req.session.userEmail = user.email;

// 🔥 REDIRECT FIX
//const redirectUrl = req.session.redirectTo || "/rts/dashboard";
const redirectUrl = req.body.redirect || req.query.redirect;

// 🟢 STUDENT
if (user.role === "student") {
  return res.redirect(redirectUrl || "/rts/dashboard");
}

// 🟢 TEACHER 🔥
if (user.role === "teacher") {

  // agar redirect hai (like specific page)
  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }

  // warna direct dashboard
  return res.redirect("/teacher-dashboard");
}

    if (user.role === "organisation") {

      if (user.organisationType === "Library") {
        return res.redirect("/library-dashboard");
      }

      if (user.organisationType === "DCA") {
        return res.redirect("/computer");
      }

      if (user.organisationType === "Coaching Centre") {
        return res.redirect("/coaching-dashboard");
      }

      return res.redirect("/organisation");
    }

    if (user.role === "admin") {
      return res.redirect("/admin");
    }

    return res.send("Invalid role");

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
};


exports.logout = (req, res) => {

    res.clearCookie("token");

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false
            });

        }

        res.clearCookie("connect.sid");

        res.set({
            "Cache-Control": "no-store, no-cache, must-revalidate, private",
            "Pragma": "no-cache",
            "Expires": "0"
        });

        return res.json({
            success: true
        });

    });

};
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await findUserByEmail(email);

    const isValidOTP = await validateOTP(email, otp);

    if (!isValidOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // 🔥 OTP clear karo
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await storeOTP(email, otp);

    const message = `<p>Your OTP is ${otp}. It will expire in 10 minutes.</p>`;
    await sendEmail(email, "Password Reset OTP", message);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const Teacher = require("../models/Teacher");
      user = await Teacher.findOne({ email });
    }

    if (!user) {
      const Organisation = require("../models/Organisation");
      user = await Organisation.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });

  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ success: false });
  }
};
exports.logout = (req, res) => {
    res.clearCookie("token"); // agar JWT use kar raha hai
    req.session?.destroy?.(); // agar session use ho raha hai

    return res.redirect("/login");
};