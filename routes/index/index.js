var express = require('express');
var router = express.Router();
var path = require('path');
var PaintSet = require('../../moduls/paintSet');
var Paint = require('../../moduls/paint');

router.get('/', function(req, res) {
    PaintSet.find(function (err,paintSets) {
        if(err) res.send(err);
        else {
            Paint.find(function (err,paints) {
                if(err) res.send(err);
                else res.render('index',{paintSets:JSON.stringify(paintSets) , paints:JSON.stringify(paints)});
            })
        }
    });
});

module.exports = router;
