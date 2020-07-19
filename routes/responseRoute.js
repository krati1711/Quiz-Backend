const express = require('express');
const { body } = require('express-validator');

const QuizResponse = require('../models/quizresponse');
const responseController = require('../controllers/response');

const router = express.Router();

router.post('/registerResponse', responseController.registerQuizResponse);

module.exports = router;