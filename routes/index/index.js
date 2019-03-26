var express = require('express');
var router = express.Router();
var path = require('path');
var PaintSet = require('../../moduls/paintSet');
var Paint = require('../../moduls/paint');
var Admin = require('../../moduls/admin');

router.get('/', function(req, res) {
    PaintSet.find(function (err,paintSets) {
        if(err) res.send("database error, try again!");
        else {
            Paint.find(function (err,paints) {
                if(err) res.send("database error, try again!");
                else {
                    Admin.find(function (err,admin) {
                        if(!err) {
                            res.render('index',{paintSets:JSON.stringify(paintSets) ,
                                paints:JSON.stringify(paints), details: {
                                    about: admin[0].about,
                                    instagram: admin[0].instagram,
                                    email: admin[0].email
                                }
                            });
                        }
                    })
                }
            })
        }
    });
});

module.exports = router;
