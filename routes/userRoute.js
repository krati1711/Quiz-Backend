const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);
router.get('/userResponse/:userid&:quizid', userController.userResponse);

module.exports = router;