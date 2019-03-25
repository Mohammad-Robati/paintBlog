var express = require('express'),
    router = express.Router(),
    PaintSet = require('../../moduls/paintSet'),
    Paint    = require('../../moduls/paint'),
    Admin    = require('../../moduls/admin'),
    paintRouter = require('./paint'),
    paintSetRouter = require('./paintSet');

router.use(paintRouter);

router.use(paintSetRouter);

router.get('/',function (req,res) {
    PaintSet.find(function (err,paintSets) {
        if(err){
        } else {
            Paint.find().populate('set').exec(function (err,paints) {
                if(err){
                } else {
                    Admin.find(function (err, admin) {
                        if(!err)
                            res.render('dashboard', {paintSets: paintSets, paints: paints, admin: admin[0]});
                    })
                }
            });
        }
    });
});

module.exports = router;