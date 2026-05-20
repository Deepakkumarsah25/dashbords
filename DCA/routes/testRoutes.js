const express = require("express");

const {
    createTest,
    getAllTests,
    deleteTest,
    updateTest
} = require("../controllers/testController");

const router = express.Router();

// CREATE TEST
router.post("/", createTest);

// GET ALL TESTS
router.get("/", getAllTests);

// DELETE TEST
router.delete("/:id", deleteTest);

// UPDATE TEST
router.put("/:id", updateTest);

module.exports = router;