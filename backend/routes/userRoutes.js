const express = require('express');
const {
    getAllUsers,
    signup,
    login,
    updateUser,
    deleteUser,
} = require('../controllers/userControllers');

const usersRoute = express.Router();

usersRoute.route('/').get(getAllUsers);
usersRoute.route('/signup').post(signup);
usersRoute.route('/login').post(login);
usersRoute.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = usersRoute;
