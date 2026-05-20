const Submission = require("../models/Submission");

const Test = require("../models/Test");


// SUBMIT TEST
const submitTest = async (req, res) => {

  try {

    const {
      testId,
      studentName,
      answers
    } = req.body;

    const test = await Test.findById(testId);

    let score = 0;

    test.questions.forEach((q, index) => {

      if (answers[index] === q.correctIndex) {
        score++;
      }

    });

    const submission = await Submission.create({
      testId,
      studentName,
      score,
      totalQuestions: test.questions.length
    });

    res.json(submission);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// GET SUBMISSIONS
const getSubmissions = async (req, res) => {

  try {

    const data = await Submission.find();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


module.exports = {
  submitTest,
  getSubmissions
};