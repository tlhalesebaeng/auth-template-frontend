const express = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userControllers');

const usersRoute = express.Router();

usersRoute.route('/users').get(getAllUsers).post(createUser);
usersRoute
    .route('/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = usersRoute;
