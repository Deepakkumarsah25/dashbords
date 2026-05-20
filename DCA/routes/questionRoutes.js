const express = require("express");

const {
    createQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion
} = require("../controllers/questionController");

const router = express.Router();

// CREATE
router.post("/", createQuestion);

// GET ALL
router.get("/", getQuestions);

// DELETE
router.delete("/:id", deleteQuestion);

// UPDATE
router.put("/:id", updateQuestion);

module.exports = router;