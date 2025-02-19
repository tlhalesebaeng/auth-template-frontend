const express = require('express');
const morgan = require('morgan');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('./controllers/userControllers');

const app = express();

app.use(express.json()); //middleware to add the incoming body data to the request object
app.use(morgan('dev'));

app.route('/quiz/app/api/v1/users').get(getAllUsers).post(createUser);
app.route('/quiz/app/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
