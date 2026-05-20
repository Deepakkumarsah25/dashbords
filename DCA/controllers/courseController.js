const Course = require("../models/Course");

// CREATE
const createCourse = async (req, res) => {

    try {

        const {
            courseName,
            courseCategory,
            courseEnrollments
        } = req.body;

        if (!courseName || !courseCategory) {

            return res.status(400).json({
                message: "All required fields missing"
            });

        }

        const newCourse = new Course({
            courseName,
            courseCategory,
            courseEnrollments
        });

        await newCourse.save();

        res.status(201).json({
            message: "Course created successfully",
            data: newCourse
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET ALL
const getCourses = async (req, res) => {

    try {

        const courses = await Course.find().sort({
            createdAt: -1
        });

        res.json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE
const updateCourse = async (req, res) => {

    try {

        const { id } = req.params;

        const updated = await Course.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true
            }
        );

        if (!updated) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        res.json({
            message: "Course updated successfully",
            data: updated
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE
const deleteCourse = async (req, res) => {

    try {

        const { id } = req.params;

        const deleted = await Course.findByIdAndDelete(id);

        if (!deleted) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        res.json({
            message: "Course deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
};