const User = require('../Model/userModel');

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: 'all users',
    });
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
            data: err,
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
