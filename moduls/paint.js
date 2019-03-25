var mongoose = require('mongoose');

var paintSchema = mongoose.Schema({
    name: String,
    image: String,
    set: {type: mongoose.Schema.Types.ObjectId, ref: 'PaintSet'},
    caption: String
});
module.exports = mongoose.model("Paint", paintSchema);