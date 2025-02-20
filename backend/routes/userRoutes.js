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
} = require('../controllers/authControllers');

const usersRoute = express.Router();

usersRoute.route('/').get(getAllUsers);
usersRoute.route('/signup').post(signup);
usersRoute.route('/login').get(login);
usersRoute.route('/pasword/reset').post(forgotPassword);
usersRoute.route('/password/:code').get(verifyCode);
usersRoute.route('/password/:code/new').patch(resetPassword);

// usersRoute.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = usersRoute;
