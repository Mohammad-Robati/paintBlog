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

module.exports = router;