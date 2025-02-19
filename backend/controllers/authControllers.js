exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

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

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide an email and password',
            });
        }

        const user = await User.findOne({ email });
        const correct = user.correctPassword(password, user.password);

        if (!user || !correct) {
            return res.status(404).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        const token = '';
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
