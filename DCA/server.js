const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testRoutes = require("./routes/testRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const franchiseRoutes = require("./routes/franchiseRoutes");
const feeRoutes = require("./routes/feeRoutes");
const bcrypt = require("bcryptjs");
const applicationRoutes = require("./routes/applicationRoutes");
const Organisation = require("../models/Organisation");

const connectDB = require("./config/db");
const path = require("path");



const router = express.Router();
/* =========================================================
   ROUTES
========================================================= */
router.use((req, res, next) => {

    console.log("===== DCA SESSION =====");
    console.log(req.session);
    console.log("USER ID =", req.session?.userId);

    next();

});
router.get("/admissions", (req, res) => {
    res.render("admissions");
});
router.get("/certificates", (req, res) => {
    res.render("certificates.ejs");
});
router.get("/courses", (req, res) => {
    res.render("courses");
});
router.get("/test", (req, res) => {
    res.render("Create_Test.ejs");
});
router.use("/fees", feeRoutes);
router.get("/", async (req, res) => {
    try {

        if (!req.session.userId) {
            return res.redirect("/login");
        }

        const user = await Organisation.findById(req.session.userId);

        if (!user) {
            return res.redirect("/login");
        }

        res.render("DCAdashboard", {
            user: user
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.get("/fees", (req, res) => {
    res.render("fees");
});
router.get("/franchises", (req, res) => {
    res.render("franchises");
});
router.get("/registrations", (req, res) => {
    res.render("registrations");
});
router.get("/reports", (req, res) => {
    res.render("reports");
});
router.get("/results", (req, res) => {
    res.render("results");
});
router.get("/settings", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.redirect("/login");
        }

        const user = await Organisation.findById(req.session.userId);

        if (!user) {
            return res.redirect("/login");
        }

        res.render("settings", { user });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.post("/settings/general", async (req, res) => {

    console.log("USER =", req.session.userId);
    console.log("BODY =", req.body);

    try {

        const { instituteName, email, contactNumber } = req.body;

        const user = await Organisation.findByIdAndUpdate(
            req.session.userId,
            {
                name: instituteName,
                email,
                phone: contactNumber
            },
            { new: true }
        );

        return res.json({
            success: true,
            user
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
router.post("/api/users/change-password", async (req, res) => {
    try {

        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "Login required"
            });
        }

        const { currentPassword, newPassword } = req.body;

        const user = await Organisation.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password incorrect"
            });
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});
router.get("/students", (req, res) => {
    res.render("students.ejs");
});
router.get("/Attendence", (req, res) => {
    res.render("Attendence.ejs");
});
router.get("/Create_ID", (req, res) => {
    res.render("Create_ID_card");
});
router.get("/collection", (req, res) => {
    res.render("Test _Collection.ejs");
});
router.get("/p", (req, res) => {
    res.render("partials/sidebar.ejs");
});
/* =========================================================
   API ROUTES
========================================================= */

router.use("/api/students", studentRoutes);
router.use("/api/questions", questionRoutes);
router.use("/api/tests", testRoutes);
router.use("/api/submissions", submissionRoutes);
router.use("/franchise", franchiseRoutes);
router.use("/fees", feeRoutes);
const courseRoutes = require("./routes/courseRoutes");

router.use("/api/courses", courseRoutes);
router.use("/api/application", applicationRoutes);
/* =========================================================

   EXPORT
========================================================= */
module.exports = router;