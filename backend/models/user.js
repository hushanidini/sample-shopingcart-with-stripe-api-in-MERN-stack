const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength: 3, maxlength:35},
    email: {
        type: String, 
        require: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String, 
        require: true,
        minlength: 3,
        maxlength: 1024,
    },
    isAdmin: {type: Boolean, default: false}
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
exports.User = User;