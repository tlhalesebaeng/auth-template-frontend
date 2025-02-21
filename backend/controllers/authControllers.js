const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const User = require('../Model/userModel');
const sendEmail = require('../email');
const { catchAsync } = require('../catchAsync');
const AppError = require('../appError');

const assignToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.signup = catchAsync(async (req, res, next) => {
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
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(400, 'Incorrect email or password.'));
    }
    const correct = await user.correctPassword(password, user.password);

    if (!correct) {
        return next(new AppError(400, 'Incorrect email or password.'));
    }

    const token = await assignToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
    });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(400, 'No user with this email found.'));
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
            throw new Error('Failed to send email! Please try again later.');
        }
    }

    res.status(200).json({
        status: 'success',
        message: 'Password reset code sent!',
    });
});

exports.verifyCode = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        passwordResetCode: req.params.code,
        passwordResetCodeExpires: { $gt: Date.now() },
    });
    if (!user) {
        return next(new AppError(400, 'Code is invalid or has expired.'));
    }

    res.status(200).json({
        status: 'success',
        message: 'Code verified!',
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { password, passwordConfirm } = req.body;

    const user = await User.findOne({
        passwordResetCode: req.params.code,
        passwordResetCodeExpires: { $gt: Date.now() },
    });
    if (!user) {
        return next(new AppError(400, 'Code is invalid or has expired.'));
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
});

exports.protect = catchAsync(async (req, res, next) => {
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
        return next(
            new AppError(
                401,
                'You are not logged in! Please log in to continue.'
            )
        );
    }

    // Verify the token
    const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
    );

    // Check if the user exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return next(
            new AppError(
                400,
                'The user with this token does not exist anymore.'
            )
        );
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
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Check if the users role matches the one provided in the roles array
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    403,
                    'You do not have the permission to perform this action.'
                )
            );
        }
        // Call the next middleware
        next();
    };
};
