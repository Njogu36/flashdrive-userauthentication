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
    var array = [];
    var emails = [];
    
    fs.exists(config.path, (err,exists) => {
        if (exists === false) {
            req.flash('danger', 'Please insert a flash Drive');
            res.redirect('/');
        }
        else {
            var fileCursor = File.find({}).cursor();
            fileCursor.on('data', function (doc) {
                fs.exists(config.path + '' + doc.name, function (err,exists) {
                    if (exists === true) {
                        array.push(doc.name)
                    }
                })

            })

            setTimeout(function () {
                if (array.length === 0) {

                    req.flash('danger', 'You have 0 password files in your flash drive');
                    res.redirect('/');
                }

                else {

                    array.map((item) => {
                        File.findOne({ name: item }, function (err, file) {
                            emails.push(file.email)
                        })
                    })
                    setTimeout(function () {
                        res.render('loginAs.jade', {
                            emails: emails
                        })
                    }, 3000)

                }

            }, 4000)

        }
    });

})