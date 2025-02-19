const express = require('express');
const {
    getAllUsers,
    getUser,
    signup,
    updateUser,
    deleteUser,
} = require('../controllers/userControllers');

const usersRoute = express.Router();

usersRoute.route('/users').get(getAllUsers).post(signup);
usersRoute
    .route('/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = usersRoute;
