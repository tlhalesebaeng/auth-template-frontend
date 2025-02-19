const express = require('express');

const app = express();

app.get('/quiz/app/api/v1/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: 'all users',
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
