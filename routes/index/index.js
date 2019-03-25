var express = require('express');
var router = express.Router();
var path = require('path');
var PaintSet = require('../../moduls/paintSet');
var Paint = require('../../moduls/paint');

router.get('/', function(req, res) {
    PaintSet.find(function (err,paintSets) {
        if(!err) res.render("index", {paintSets: paintSets});
    });
});

router.get('/projects',function (req,res) {
    PaintSet.find(function (err,paintSets) {
        if(err) res.send(err);
        else {
            res.render('projects',{paintSets: paintSets});
        }
    });
});

router.get('/:paintSet',function (req,res) {
    PaintSet.find({name: req.params.paintSet},function (err,foundPaintSet) {
        if(err) res.send(err);
        else {
            if(foundPaintSet.length===0) {
                res.redirect('/');
            } else {
                console.log(foundPaintSet[0]._id);
                Paint.find({set: foundPaintSet[0]._id},function (err,foundPaints) {
                    if(err) res.send(err);
                    else {
                        console.log(foundPaints);
                        PaintSet.find(function (err,paintSets) {
                            if(!err) res.render("paintSet", {paintSet: foundPaintSet[0], paints:foundPaints, paintSets: paintSets});

                        });
                    }
                });
            }
        }
    });
});

module.exports = router;
