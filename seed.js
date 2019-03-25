var mongoose = require('mongoose'),
    Admin    = require('./moduls/admin'),
    fs       = require('fs');

var seedDB = function() {
    mongoose.connect('mongodb://localhost/paint_blog');

    //mongoose.connection.dropDatabase();

    Admin.create({
        username: "akbar.bazoft",
        password: "7dPapD9s"
    },function (err,createdAdmin) {
        createdAdmin.save(function (err) {
            if(err) console.log(err);
        })
    });

};

module.exports = seedDB;


