var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PaintSet = require('../../moduls/paintSet');
var Paint = require('../../moduls/paint');
var path = require('path');
var fs = require('fs');
var rimraf = require("rimraf");

router.post('/paint',function (req,res) {
    if(!req.files) {
        res.send('no file');
    } else {
        var file = req.files.file;
        var extension = path.extname(file.name).toLowerCase();
        if(extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            res.send('no image');
        } else {
            PaintSet.find({name: req.body.set}, function (err, foundSet) {
                if(err) {
                    res.send("database error, try again!");
                } else {
                    if(foundSet.length===0){
                        res.send('no such set');
                    } else {
                        Paint.create({
                            name: req.body.name,
                            caption: req.body.caption,
                            set: foundSet[0]._id
                        }, function (err, paintCreated) {
                            if (err) {
                                res.send("database error, try again!");
                            } else {
                                paintCreated.image = 'images/' + paintCreated.set + '/' + paintCreated._id + extension;
                                paintCreated.save(function (err, savedPaint) {
                                    if (err) res.send("database error, try again!");
                                    else  console.log(savedPaint)
                                });
                                file.mv('public/' + paintCreated.image, function (err) {
                                    if(err)
                                        res.send("file writing error, try again!");
                                });
                                if(!foundSet[0].thumbnail) {
                                    foundSet[0].thumbnail = paintCreated.image;
                                    foundSet[0].save(function (err) {
                                        if(err) res.send("database error, try again!");
                                        else res.redirect('/dashboard');
                                    });
                                } else {
                                    res.redirect('/dashboard');
                                }
                            }
                        });
                    }
                }
            });
        }
    }
});

router.put('/paint/:id', function (req,res) {
    Paint.findOneAndUpdate({_id:req.params.id},{
        name: req.body.name,
        caption: req.body.caption
    }, {new:true} , function (err) {
        if(err) res.send("database error, try again!");
        else {
            res.redirect('/dashboard');
        }
    })
});

router.delete('/paint/:id', function (req,res) {
    Paint.findOneAndDelete({_id:req.params.id}, function (err,foundPaint){
        if(err) res.send("database error, try again!");
        else {
            fs.unlink('public/' + foundPaint.image, function (err) {
                if (err) throw err;
            });

            PaintSet.find({_id: foundPaint.set._id},function (err,foundPaintSet) {
                if(err) res.send("database error, try again!");
                else {
                    if(foundPaintSet[0].thumbnail===foundPaint.image) {
                        Paint.find({set: foundPaint.set},function (err,foundOne) {
                            if(err) res.send("database error, try again!");
                            else {
                                if(foundOne.length!==0) {
                                    foundPaintSet[0].thumbnail = foundOne[0].image;
                                } else {
                                    foundPaintSet[0].thumbnail = undefined;
                                }
                                foundPaintSet[0].save(function (err) {
                                    if(err) res.send("database error, try again!");
                                    else {
                                        res.redirect('/dashboard');
                                    }
                                })
                            }
                        })
                    } else {
                        res.redirect('/dashboard');
                    }
                }
            });
        }
    });
});

module.exports = router;