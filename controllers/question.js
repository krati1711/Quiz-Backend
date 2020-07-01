const { validationResult } = require('express-validator/check');

const Question = require('../models/questions');
const Quiz = require('../models/quiz');


exports.addQuestion = (req, res, next) => {
    const actualquestion = req.body.question;
    const option1 = req.body.option1;
    const option2 = req.body.option2;
    const answer = req.body.answer;
    const quizid = req.body.quizId;

    const question = new Question({
        question: actualquestion,
        option1: option1,
        option2: option2,
        answer: answer,
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