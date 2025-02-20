const express = require('express');
const {
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controllers/userControllers');
const {
    signup,
    login,
    forgotPassword,
    verifyCode,
    resetPassword,
    protect,
    restrictTo,
} = require('../controllers/authControllers');

const usersRoute = express.Router();

// User routes
usersRoute.route('/').get(protect, restrictTo('admin'), getAllUsers);

// User authentication routes
usersRoute.route('/signup').post(signup);
usersRoute.route('/login').get(login);
usersRoute.route('/pasword/reset').post(forgotPassword);
usersRoute.route('/password/:code').get(verifyCode);
usersRoute.route('/password/:code/new').patch(resetPassword);

// Export the user route to use it as a middleware
module.exports = usersRoute;
