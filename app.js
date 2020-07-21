const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const helmet = require('helmet');

const app = express();

// const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/adminRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoute');
const responseRoutes = require('./routes/responseRoute');

//to disable header used to find if server is express prevent express related attacks()
app.disable('x-powered-by');

// logger 
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});*/


app.use((error, req, res, next) => {
    console.log("---------------------------------------------yaha aaya mai");
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    logger.log('error', message);
    res.status(status).json({ message: message, data: data });
});

app.use(authRoutes);
app.use(quizRoutes);
app.use(questionRoutes);
app.use(userRoutes);
app.use(responseRoutes);

mongoose
    .connect(
        'mongodb://krati:krati@cluster0-shard-00-00-vccpc.mongodb.net:27017,cluster0-shard-00-01-vccpc.mongodb.net:27017,cluster0-shard-00-02-vccpc.mongodb.net:27017/Quiz?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Backend Started");
        app.listen(3000);
    })
    .catch(err => console.log("err->" + err));
//app.listen(5000);


// app.listen(3000)