var mongoose = require('mongoose');

var paintSetSchema = mongoose.Schema({
    name: String,
    date: String,
    location: String,
    description: String,
    thumbnail: String
});
module.exports = mongoose.model("PaintSet", paintSetSchema);