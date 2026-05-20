const express = require("express");

const {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const router = express.Router();

// CREATE
router.post("/", createCourse);

// READ
router.get("/", getCourses);

// UPDATE
router.put("/:id", updateCourse);

// DELETE
router.delete("/:id", deleteCourse);

module.exports = router;