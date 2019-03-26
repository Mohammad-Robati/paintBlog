var mongoose = require('mongoose'),
    Admin    = require('./moduls/admin'),
    fs       = require('fs');

var seedDB = function() {
    //mongoose.connect('mongodb://localhost/paint_blog');

    mongoose.connect('mongodb://moh.robati:7dPapD9s@ds123346.mlab.com:23346/sitra_ahra');

    /*mongoose.connection.dropDatabase();

    Admin.create({
        username: "mernas",
        password: "sitraahra",
        email: "mm2008@gmail.com",
        instagram: "_mehrnaz.mobini_",
        about: "I am who I am :|"
    },function (err,createdAdmin) {
        createdAdmin.save(function (err) {
            if(err) console.log(err);
        })
    });
*/
};

module.exports = seedDB;


