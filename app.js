const express = require('express');
const path = require('path');
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = require('./config/database');
const user = require('./routes/users');

const connection = mongoose.connect(config.database);
if(connection){
    console.log("db connected");
}else{
    console.log("db not connected");
}

app.use(express.static(path.join(__dirname,"public"))) ;

app.use('/user',user);

app.get("/",function (req, res) {
   res.send("Hello World!");
});

app.listen(3000,function () {
    console.log("Listening to port " + port);
});
