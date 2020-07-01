const { validationResult } = require('express-validator/check');

const Quiz = require('../models/quiz');


exports.addQuiz = (req, res, next) => {
    const quizTitle = req.body.quizName;
    const quizTime = req.body.quizTime;

    const quiz = new Quiz({
        quizName: quizTitle,
        timeperquiz: quizTime
    });

    quiz
        .save()
        .then(result => {
            res.status(201).json({ message: 'Quiz Created!' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};