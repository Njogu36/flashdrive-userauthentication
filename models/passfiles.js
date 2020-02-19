var mongoose = require('mongoose');
var fileSchema = mongoose.Schema({
    name:String,
    email:String
    
});
var File = mongoose.model('File',fileSchema);
module.exports = File