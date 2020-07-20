const express = require('express');
const { body } = require('express-validator');

const Quiz = require('../models/quiz');
const quizController = require('../controllers/quiz');

const router = express.Router();

router.post('/addQuiz', quizController.addQuiz);
router.get('/getAllQuiz', quizController.getAllQuiz);
router.delete('/deleteQuiz/:quizid', quizController.deleteQuiz);
// sample link - localhost:3000/deleteQuiz/5f15237d1121583eb0d85c91

module.exports = router;