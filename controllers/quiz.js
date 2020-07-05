const { validationResult } = require('express-validator');

const Quiz = require('../models/quiz');


exports.addQuiz = (req, res, next) => {
    const quizTitle = req.body.quizName;

    const quiz = new Quiz({
        quizName: quizTitle,
    });

    quiz
        .save()
        .then(result => {
            res.status(200).json({ message: 'Quiz Created!' });
        })
        .catch(err => {
            
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getAllQuiz = (req, res ,next) => {
    Quiz
        .find()
        .then(quizes => {
            res.status(200).json({
              message: 'All Quizzes are present madam.',
              quizes: quizes
            });
          })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
}

