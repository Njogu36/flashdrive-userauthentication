var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var fs = require('fs');
var config = require('./config/keys.js')
var app = express();



app.set('view engine','jade');
app.set('/views','./views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
 mongoose.connect(config.Database)
 var db = mongoose.connection;
 db.once('open',function(){
    app.listen(process.env.PORT || 7000,function(err){
        console.log('Database has connected')
        console.log('running on port 7000')
    }) 
 })
 db.on('error',function(error){
     console.log(error)
 })

 app.use(require('connect-flash')());
 app.use(function (req, res, next) {
   res.locals.messages = require('express-messages')(req, res);
   next();
 });
 app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
   
}));

var user = require('./routes/index.js');
app.use('/',user);


