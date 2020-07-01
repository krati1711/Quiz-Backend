const express = require('express');
const { body } = require('express-validator/check');

const Question = require('../models/questions');
const questionsController = require('../controllers/question');

const router = express.Router();

router.post('/addQuestion', questionsController.addQuestion);

module.exports = router;