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
        const newUser = await User.create(req.body);
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

        try {
            const info = await sendEmail(email, code);
            console.log('Email sent: ' + info.response);
        } catch (err) {
            user.passwordResetCode = undefined;
            user.passwordResetCodeExpires = undefined;
            await user.save({ validateBeforeSave: false });
            throw new Error('Failed to send email! Please try again later.');
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
