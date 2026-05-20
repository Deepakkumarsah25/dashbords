const express = require("express");

const Submission = require("../models/Submission");

const Test = require("../models/Test");

const router = express.Router();


// ✅ CREATE SUBMISSION
router.post("/", async (req, res) => {

    try {

        // console.log("SUBMIT BODY:", req.body);

        const {
            testId,
            studentName,
            score
        } = req.body;

        if (!testId || !studentName) {

            return res.status(400).json({
                message: "Missing fields"
            });

        }

        // FIND TEST
        const test = await Test.findById(testId);

        if (!test) {

            return res.status(404).json({
                message: "Test not found"
            });

        }

        // SAVE SUBMISSION
        const submission = await Submission.create({
            testId,
            studentName,
            score,
            totalQuestions: test.questions.length
        });

        // UPDATE ATTEMPTS
        test.attempts = (test.attempts || 0) + 1;

        await test.save();

        // console.log("SUBMISSION SAVED:", submission);

        res.json({
            success: true,
            submission
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// ✅ GET ALL SUBMISSIONS OF TEST
router.get("/:testId", async (req, res) => {

    try {

        const submissions = await Submission.find({
            testId: req.params.testId
        }).sort({
            submittedAt: -1
        });

        res.json(submissions);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error loading submissions"
        });

    }

});

module.exports = router;