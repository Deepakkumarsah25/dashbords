const Test = require("../models/Test");


// CREATE TEST
const createTest = async (req, res) => {
    try {

        console.log("REQ BODY =", req.body);

        const { testTitle, timeLimit, questions } = req.body;

        if (!testTitle) {
            return res.status(400).json({
                message: "Test title required"
            });
        }

        if (!questions || questions.length === 0) {
            return res.status(400).json({
                message: "No questions selected"
            });
        }

        const newTest = new Test({
            testTitle,
            timeLimit,
            questions
        });

        await newTest.save();

        console.log("TEST SAVED =", newTest);

        res.status(201).json({
            success: true,
            message: "Test Created",
            test: newTest
        });

    } catch (error) {

        console.log("CREATE TEST ERROR =", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL TESTS
const getAllTests = async (req, res) => {

    try {

        const tests = await Test.find();

        res.json(tests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// DELETE TEST
const deleteTest = async (req, res) => {

    try {

        await Test.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE TEST
const updateTest = async (req, res) => {

    try {

        const {
            testTitle,
            timeLimit,
            questions
        } = req.body;

        const updated = await Test.findByIdAndUpdate(
            req.params.id,
            {
                testTitle,
                timeLimit,
                questions
            },
            {
                new: true
            }
        );

        res.json(updated);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createTest,
    getAllTests,
    deleteTest,
    updateTest
};