let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name:String,
    sex:String,
    age:Number,
    country:String,
    dateOfCreated:Date
});
let userInfo = mongoose.model('userData',userSchema);

module.exports = userInfo;