const { validationResult } = require('express-validator/check');

const Question = require('../models/questions');
const Quiz = require('../models/quiz');


exports.addQuestion = (req, res, next) => {
    const actualquestion = req.body.question;
    const correctAnswer = req.body.correct_answer;
    const wrongAnswer = req.body.wrong_answer;
    const quizid = req.body.quizId;


    const question = new Question({
        question: actualquestion,
        correct_answer: correctAnswer,
        incorrect_answer: wrongAnswer,
        quizname: quizid
    });

    question
        .save()
        .then(result => {
            return Quiz.findById(quizid);
        })
        .then(quiz => {
            let tempQuiz = quiz;
            quiz.questions.push(question);
            return quiz.save();
        })
        .then(result => {
            res.status(201).json({ message: 'Question Created!' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};