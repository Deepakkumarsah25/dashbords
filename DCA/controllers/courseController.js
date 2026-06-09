const Course = require("../models/Course");

// CREATE COURSE
exports.createCourse = async (req, res) => {
    try {

        console.log("Session =>", req.session);
        console.log("UserId =>", req.session?.userId);

        const {
            courseName,
            courseCategory,
            courseEnrollments
        } = req.body;

        const course = await Course.create({
            courseName,
            courseCategory,
            courseEnrollments,
            organisationId: req.session.userId
        });

        res.status(201).json(course);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// GET ALL COURSES
exports.getCourses = async (req, res) => {
    try {

        const courses = await Course.find({
            organisationId: req.session.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json(courses);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
    try {

        const course = await Course.findOneAndUpdate(
            {
                _id: req.params.id,
                organisationId: req.session.userId
            },
            req.body,
            {
                new: true
            }
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
    try {

        const course = await Course.findOneAndDelete({
            _id: req.params.id,
            organisationId: req.session.userId
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};