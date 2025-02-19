const User = require('../Model/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users,
        });
    } catch (err) {
        res.status(200).json({
            status: 'success',
            message: err,
        });
    }
};

exports.getUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: `get user ${req.params.id}`,
    });
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: newUser,
        });
    } catch (err) {
        res.status(400).json({
            status: 'success',
            message: err,
        });
    }
};

exports.updateUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: req.body,
    });
};

exports.deleteUser = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
