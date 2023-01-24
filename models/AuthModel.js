const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    fullName : {type : String, required : true},
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
    isAdmin : {type : Boolean, default : false}
}, {
    versionKey : false,
    timestamps : true
});

const AuthModel = mongoose.model('auth', authSchema);
module.exports = { AuthModel };