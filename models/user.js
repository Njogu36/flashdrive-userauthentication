var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    username:String
});
var User = mongoose.model('User',userSchema);
module.exports = User