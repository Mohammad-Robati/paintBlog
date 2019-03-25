var express = require('express');
var router = express.Router();
var Admin = require('../../moduls/admin');

router.get('/',function (req,res) {
    res.render('admin');
});

router.post('/',function (req,res) {
    if(!req.body.username || !req.body.password) {
        res.send("fields are empty!");
    } else {
        Admin.findOne({username: req.body.username}, function (err, foundAdmin) {
            if(err) {
                res.send("Problem reading from db");
            } else {
                if(!foundAdmin) {
                    res.send("username wrong!");
                } else {
                    Admin.findOne({password: req.body.password}, function (err, foundAdmin) {
                        if(err) {
                            res.send("Problem reading from db");
                        } else {
                            if (!foundAdmin) {
                                res.send("password wrong!");
                            } else {
                                req.session.user = foundAdmin;
                                res.redirect('dashboard')
                            }
                        }
                    })
                }
            }
        });
    }
});

router.put('/',function (req,res) {
    if(!req.body.username || !req.body.password1 || !req.body.password2 ||
        !req.body.email || !req.body.instagram) {
        res.send('fill all the fields!');
    } else {
        if(req.body.password1!==req.body.password2){
            res.send('two passwords doesn\'t match');
        } else {
            Admin.find(function (err, foundAdmin) {
                if (!err) {
                    Admin.findOneAndUpdate({_id: foundAdmin[0]._id},{
                        username:req.body.username,
                        password:req.body.password1,
                        email:req.body.email,
                        about:req.body.about,
                        instagram:req.body.instagram
                    }, function (err) {
                        if(!err)
                        res.redirect('/dashboard')
                    })
                }
            })
        }
    }
});

module.exports = router;