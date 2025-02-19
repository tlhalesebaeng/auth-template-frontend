const express = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('./controllers/userControllers');

const app = express();

app.use(express.json()); //middleware to add the incoming body data to the request object

app.route('/quiz/app/api/v1/users').get(getAllUsers).post(createUser);
app.route('/quiz/app/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
