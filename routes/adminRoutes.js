const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/login', adminController.login);

module.exports = router;