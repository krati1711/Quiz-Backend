const { validationResult } = require('express-validator/check');

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

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find()
      .countDocuments()
      .then(count => {
        totalItems = count;
        return Post.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
      })
      .then(posts => {
        res.status(200).json({
          message: 'Fetched posts successfully.',
          posts: posts,
          totalItems: totalItems
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };