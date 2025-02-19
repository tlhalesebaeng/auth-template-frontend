const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'A user must have a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'A user must have a last name'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match',
        },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
