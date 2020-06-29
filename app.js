const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/adminRoutes');

app.use(bodyParser.json()); 

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
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

app.use(authRoutes);
app.use('/ll', (req, res, next) => {
    console.log("ll me aaya");
});
  
  mongoose
    .connect(
      'mongodb://krati:krati@cluster0-shard-00-00-vccpc.mongodb.net:27017,cluster0-shard-00-01-vccpc.mongodb.net:27017,cluster0-shard-00-02-vccpc.mongodb.net:27017/Quiz?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    )
    .then(result => {
        console.log("res->" + result);

      app.listen(3000);
    })
    .catch(err => console.log("err->"+err));
    //app.listen(5000);
  

// app.listen(3000)

 