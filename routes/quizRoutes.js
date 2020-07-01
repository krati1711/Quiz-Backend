const express = require('express');
const { body } = require('express-validator/check');

const Quiz = require('../models/quiz');
const quizController = require('../controllers/quiz');

const router = express.Router();

router.post('/addQuiz', quizController.addQuiz);
router.get('/getAllQuiz', quizController.getAllQuiz);

module.exports = router;