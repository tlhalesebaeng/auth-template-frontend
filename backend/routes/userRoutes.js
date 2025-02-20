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
} = require('../controllers/authControllers');

const usersRoute = express.Router();

usersRoute.route('/').get(getAllUsers);
usersRoute.route('/signup').post(signup);
usersRoute.route('/login').get(login);
usersRoute.route('/pasword/reset').post(forgotPassword);

// usersRoute.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = usersRoute;
