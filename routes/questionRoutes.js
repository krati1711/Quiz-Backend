const express = require('express');
const { body } = require('express-validator');

const Question = require('../models/questions');
const questionsController = require('../controllers/question');

const router = express.Router();

router.post('/addQuestion', questionsController.addQuestion);
router.get('/getQuestionsPerQuiz/:quizid', questionsController.getQuestionsPerQuiz);

module.exports = router;