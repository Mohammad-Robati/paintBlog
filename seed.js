var mongoose = require('mongoose'),
    Admin    = require('./moduls/admin'),
    fs       = require('fs');

var seedDB = function() {
    mongoose.connect('mongodb://localhost/paint_blog');

    /*mongoose.connection.dropDatabase();

    Admin.create({
        username: "sitra.ahra",
        password: "7dPapD9s",
        email: "mm2008@gmail.com",
        instagram: "_mehrnaz.mobini_",
        about: "I am who I am :|"
    },function (err,createdAdmin) {
        createdAdmin.save(function (err) {
            if(err) console.log(err);
        })
    });*/

};

module.exports = seedDB;


