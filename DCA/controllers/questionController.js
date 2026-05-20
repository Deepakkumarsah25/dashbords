const Question = require("../models/Question");

// CREATE QUESTION
const createQuestion = async (req, res) => {

    try {

        const {
            questionText,
            options,
            correctAnswer,
            category
        } = req.body;

        const map = {
            A: 0,
            B: 1,
            C: 2,
            D: 3
        };

        const newQuestion = await Question.create({
            questionText,
            options,
            correctIndex: map[correctAnswer],
            category
        });

        res.status(201).json(newQuestion);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// GET QUESTIONS
const getQuestions = async (req, res) => {

    try {

        const data = await Question.find();

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// DELETE QUESTION
const deleteQuestion = async (req, res) => {

    try {

        await Question.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};


// UPDATE QUESTION
const updateQuestion = async (req, res) => {

    try {

        const {
            questionText,
            options,
            correctAnswer,
            category
        } = req.body;

        const map = {
            A: 0,
            B: 1,
            C: 2,
            D: 3
        };

        const updated = await Question.findByIdAndUpdate(
            req.params.id,
            {
                questionText,
                options,
                correctIndex: map[correctAnswer],
                category
            },
            {
                new: true
            }
        );

        res.json(updated);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};

module.exports = {
    createQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion
};