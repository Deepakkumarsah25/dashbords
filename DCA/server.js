const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testRoutes = require("./routes/testRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const franchiseRoutes = require("./routes/franchiseRoutes");
const feeRoutes = require("./routes/feeRoutes");

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
router.get("/settings", (req, res) => {
    res.render("settings");
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