const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
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
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
});

userSchema.pre('save', async function (next) {
    //only run this if the password was changed
    if (!this.isModified('password')) return next();

    //Hash the password
    this.password = await bcrypt.hash(this.password, 12);

    //Delete the confirm password field
    this.passwordConfirm = undefined;

    //call the next middleware
    next();
});

userSchema.pre('save', function (next) {
    // Run this if the user is not new and the password was changed
    if (!this.isModified('password') || this.isNew) return next();

    // Set this property a second before to ensure we assign the token after changing the password
    this.passwordChangedAt = Date.now() - 1000;

    // Call the next middleware
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChanged = async function (jwtTimestamp) {
    // Check if this property exists
    if (this.passwordChangedAt) {
        // Convert the database time to a comparable integer
        const passwordTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return jwtTimestamp < passwordTimestamp;
    }

    // Password not change i.e property does not exist
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
