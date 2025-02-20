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
            status: 'fail',
            message: err,
        });
    }
};
