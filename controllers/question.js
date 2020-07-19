const { validationResult } = require('express-validator');

const Question = require('../models/questions');
const Quiz = require('../models/quiz');


exports.addQuestion = (req, res, next) => {
    const actualquestion = req.body.question;
    const answer = req.body.answer;
    const options = req.body.options;
    const quizid = req.body.quizId;


    const question = new Question({
        question: actualquestion,
        answer: answer,
        options: options,
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

exports.getQuestionsPerQuiz = (req, res ,next) => {
    const quizid = req.params.quizid;
    
    if (quizid === 'undefined' || quizid == null) {
        
        res.status(403).json({ message: 'invalid quizid'});
        next();
        return;
    }
    Question
        .find( { 'quizname' : quizid})
        .then(quizes => {
            res.status(200).json({
              message: 'Got All Quiz for that question',
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