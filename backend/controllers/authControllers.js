const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const User = require('../Model/userModel');
const sendEmail = require('../email');

const assignToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        const token = await assignToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: newUser,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const correct = await user.correctPassword(password, user.password);

        if (!user || !correct) {
            return res.status(404).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        const token = await assignToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user with this email found!',
            });
        }

        const code = randomstring.generate({ length: 6, charset: 'numeric' });
        user.passwordResetCode = code;
        user.passwordResetCodeExpires = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false });

        if (process.env.NODE_ENV === 'development') {
            console.log('Code :', code);
        } else {
            try {
                const info = await sendEmail(email, code);
                console.log('Email sent: ' + info.response);
            } catch (err) {
                user.passwordResetCode = undefined;
                user.passwordResetCodeExpires = undefined;
                await user.save({ validateBeforeSave: false });
                throw new Error(
                    'Failed to send email! Please try again later.'
                );
            }
        }

        res.status(200).json({
            status: 'success',
            message: 'Password reset code sent!',
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.verifyCode = async (req, res) => {
    try {
        const user = await User.findOne({
            passwordResetCode: req.params.code,
            passwordResetCodeExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Code is invalid or has expired!',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Code verified!',
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, passwordConfirm } = req.body;

        const user = await User.findOne({
            passwordResetCode: req.params.code,
            passwordResetCodeExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Code is invalid or has expired!',
            });
        }

        user.password = password;
        user.passwordConfirm = passwordConfirm;
        user.passwordResetCode = undefined;
        user.passwordResetCodeExpires = undefined;
        await user.save({ validateBeforeSave: false });

        const token = await assignToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.protect = async (req, res, next) => {
    try {
        // Get the token
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if the token exists
        if (!token) {
            res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to continue.',
            });
        }

        // Verify the token
        const decodedToken = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        // Check if the user exists
        const user = await User.findById(decodedToken.id);
        if (!user) {
            res.status(401).json({
                status: 'fail',
                message: 'The user with this token does not exist anymore',
            });
        }

        // Ensure that the user did not change the password after the token was issued
        if (await user.passwordChanged(decodedToken.iat)) {
            return res.status(401).json({
                status: 'fail',
                message: 'Password recently changed! Please log in again.',
            });
        }

        // Grant the user access to the protected route
        req.user = user;

        // Call the next middleware
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! Please log in to continue.',
        });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Check if the users role matches the one provided in the roles array
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message:
                    'You do not have the permission to perform this action.',
            });
        }
        // Call the next middleware
        next();
    };
};
