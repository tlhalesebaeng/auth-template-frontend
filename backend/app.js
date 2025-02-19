const express = require('express');

const app = express();

app.use(express.json()); //middleware to add the incoming body data to the request object

app.get('/quiz/app/api/v1/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: 'all users',
    });
});

app.get('/quiz/app/api/v1/users/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: `get user ${req.params.id}`,
    });
});

app.post('/quiz/app/api/v1/users', (req, res) => {
    res.status(201).json({
        status: 'success',
        data: req.body,
    });
});

app.patch('/quiz/app/api/v1/users/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: req.body,
    });
});

app.delete('/quiz/app/api/v1/users/:id', (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
