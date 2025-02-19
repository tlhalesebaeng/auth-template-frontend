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

app.get('/quiz/app/api/v1/users', getAllUsers);
app.get('/quiz/app/api/v1/users/:id', getUser);
app.post('/quiz/app/api/v1/users', createUser);
app.patch('/quiz/app/api/v1/users/:id', updateUser);
app.delete('/quiz/app/api/v1/users/:id', deleteUser);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
