var express = require('express');
var router = express.Router();
var PaintSet = require('../../moduls/paintSet');
var Paint = require('../../moduls/paint');
var fs = require('fs');
var rimraf = require("rimraf");

router.post('/paintSet',function (req,res) {
    if(!req.body.name) {
        res.send('no data');
    } else {
        PaintSet.create({
            name: req.body.name,
            description : req.body.description,
            date : req.body.date,
            color: req.body.color
        }, function (err, paintSetCreated) {
            if(err){
                console.log(err);
            } else {
                paintSetCreated.save(function (err, savedPaintSet) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(savedPaintSet);
                        var dir = 'public/images/' + savedPaintSet._id;
                        if (!fs.existsSync(dir)){
                            fs.mkdirSync(dir);
                        }
                        res.redirect('/dashboard');
                    }
                })
            }
        });
    }
});

router.put('/paintSet/:id',function (req,res) {
    console.log(req.body);
    PaintSet.findOneAndUpdate({_id:req.params.id},{
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        date : req.body.date
    },function (err) {
        if(err) res.send("database error, try again!");
        else res.redirect('/dashboard')
    })
});

router.delete('/paintSet/:id',function (req,res) {
    PaintSet.findOneAndDelete({_id:req.params.id}, function (err,deletedPaintSet) {
        if(err) res.send("database error, try again!");
        else {
            rimraf('public/images/' + deletedPaintSet._id, function () {
            });
            Paint.deleteMany({set: deletedPaintSet._id}, function () {

            });
            res.redirect('/dashboard')
        }
    })
});

module.exports = router;