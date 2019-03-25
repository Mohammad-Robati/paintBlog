var mongoose = require('mongoose'),
    Admin    = require('./moduls/admin'),
    PaintSet = require('./moduls/paintSet'),
    fs       = require('fs');

var seedDB = function() {
    mongoose.connect('mongodb://localhost/paint_blog');

    mongoose.connection.dropDatabase();

    Admin.create({
        username: "akbar.bazoft",
        password: "7dPapD9s"
    },function (err,createdAdmin) {
        createdAdmin.save(function (err) {
            if(err) console.log(err);
        })
    });

    PaintSet.create({
        name: "Single Shots",
        description: "My Single Paints",
        location: "Mostly in Iran",
        date: "Since i've started..."
    }, function (err,createdPaintSet) {
        createdPaintSet.save(function (err,savedPaintSet) {
            if(err) console.log(err);
            else {
                var dir = 'public/images/' + savedPaintSet._id;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir,function (err) {
                        console.log(err);
                    });
                }
            }
        });
    });
};

module.exports = seedDB;


