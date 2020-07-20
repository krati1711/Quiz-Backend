const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const QuizResponse = require('../models/quizresponse');
const Response = require('../models/response');

const TOKEN_SECRET = 'df79sg7s9dfds7f79sdf9sd7dfsfmpq32'

exports.registerUser = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const username = name.substring(0, 3) + name.substring(name.length - 3, name.length);
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(200).json({ status: 'email already present', mystatuscode: 0 });
                next();
            }
            else {
                const newUser = new User({
                    username: username,
                    name: name,
                    age: age,
                    email: email,
                    gender: gender
                });
                return newUser.save();
            }
        })
        .then(result => {
            const token = generateAccessToken(result.name);
            res.status(201).json({ message: 'New User Created!', username: result.id, name: result.name, mystatuscode: 1, token: token });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.loginUser = (req, res, next) => {
    const name = req.body.name;

    User.findOne({ username: name })
        .then(user => {
            if (!user) {
                res.status(200).json({ status: 'No such username present. Register first', mystatuscode: 0 });
            }
            else {
                const token = generateAccessToken(user.name);
                res.status(201).json({ message: 'User Found!', username: user.id, name: user.name, mystatuscode: 1, token: token });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({ username: username, access: 'given' }, TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.userResponse = (req, res, next) => {
    const userid = req.params.userid;
    const quizid = req.params.quizid;

    console.log(userid , ' ' , quizid);
    let user;

    User.findById(userid)
        .then(result => {
            console.log('result1 - ' + result);
            user = result;
            return QuizResponse.find({ username: user._id, quizid: quizid })
        })
        .then(result => {
            console.log('result2 - ' + result);
            return Response.find().where('_id').in(result[0].responses).exec();
        })
        .then(result => {
            res.status(200).json({ status: 'Mic check all ok', user: user, responses: result, mystatuscode: 1 });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}