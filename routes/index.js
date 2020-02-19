var express = require('express');
var User = require('../models/user.js')
var File = require('../models/passfiles.js')
var fs = require('fs');
var path = require('path')
var bcrypt = require('bcryptjs');
var flash = require('connect-flash')
var config = require('../config/keys.js')
var IsThere = require("is-there");
var router = express.Router();


router.get('/', function (req, res) {

    res.render('login.jade')
})
router.get('/signup', function (req, res) {
    res.render('signup.jade',
        {
            path: config.path
        });
});
router.get('/dashboard', function (req, res) {
    res.render('dashboard.jade')
})
router.get('/forgotPassword', function (req, res) {
    res.render('forgotPassword.jade')
})
router.get('/login/:email', function (req, res) {

    function readContent(callback) {
        fs.readFile(config.path + '' + config.Website + '-' + req.params.email + '.txt', 'utf-8', function (err, content) {
            if (err) return callback(err)
            callback(null, content)
        })
    }

    readContent(function (err, content) {
        console.log(content)

        User.findOne({ email: req.params.email }, function (err, user) {
            if (user) {
                
                bcrypt.compare(user.id, content, function(err, response) {
                    if(response)
                    {
                        res.send({success:true,user:user})
                    }
                    else
                    {
                        res.send({success:false})
                    }
                });

            }

        })
    })

})
router.get('/login', function (req, res) {

 var emails = [];
 fs.exists(config.path,function(exists){
      if(exists)
      {
         var fileCursor = File.find({}).cursor();
         fileCursor.on('data',function(doc){
            fs.exists(config.path+doc.name,function(file){
                if(file)
                {
                 emails.push(doc.email)
                }
                else
                {
                    console.log('Error')
                }
            })
         })

         setTimeout(function(){
             if(emails.length===0){
                 req.flash('danger','You have 0 passwords saved in your flash drive.')
             }
             else
             {
                res.render('loginAs.jade', {
                    emails: emails
                })
             }
         },4000)
      }
      else
      {
          req.flash('danger','No flash drive found. Please insert one or ensure the drive letter or path is '+ config.path)
          res.redirect('/')
      }
 })
})
router.post('/signup', function (req, res) {
    console.log(config.path)
    var p = config.path
    User.findOne({ email: req.body.email }, function (err, use) {
        if (use) {
            req.flash('danger', 'User already exists');
            res.redirect('/signup');
        }
        else {
            fs.exists(p, (exists) => {
                console.log(p+ ' - '+exists)
                if (exists === false) {
                    req.flash('danger', 'Kindly insert the correct flash drive');
                    res.redirect('/signup');
                }
                else {



                    var data = new User();
                    data.fullname = req.body.fullname;
                    data.email = req.body.email;
                    data.save(function (err) {
                        setTimeout(function () {
                            User.findOne({ fullname: req.body.fullname, email: req.body.email }, function (err, user) {
                                if (user) {
                                    bcrypt.genSalt(10, function (err, salt) {
                                        bcrypt.hash(user.id, salt, function (err, hash) {
console.log(hash)
                                            fs.writeFile(config.path+'' + config.Website + '-' + req.body.email + '.txt', hash, function (err) {
                                                var data = new File();
                                                data.name = config.Website + '-' + req.body.email + '.txt';
                                                data.email = req.body.email;
                                                data.save(function (err) {
                                                    req.flash('info', 'Thank you for signing up. Kindly login.');
                                                    res.redirect('/');
                                                })

                                            })
                                        });
                                    });
                                }
                            })
                        }, 2000)
                    })

                }
            });
        }
    })


})
router.post('/forgotPassword', function (req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
            req.flash('danger', "User doesn't exist");
            res.redirect('/forgotPassword');

        }
        else {
            fs.exists(config.path, (exists) => {
                if (exists === false) {
                    req.flash('danger', 'Kindly insert the correct flash drive');
                    res.redirect('/forgotPassword');
                }
                else {






                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.id, salt, function (err, hash) {
                            fs.exists(config.path + '' + config.Website + '-' + req.body.email + '.txt', function (exists) {
                                if (exists) {
                                    fs.writeFile(config.path + '' + config.Website + '-' + req.body.email + '.txt', hash, function (err) {

                                        res.redirect('/')


                                    })
                                }
                                else {
                                    fs.writeFile(config.path + '' + config.Website + '-' + req.body.email + '.txt', hash, function (err) {

                                        res.redirect('/')


                                    })
                                }
                            })

                        });
                    });




                }
            });
        }
    })


})

module.exports = router