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

exports.createUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        data: req.body,
    });
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
