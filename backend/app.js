const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const usersRoute = require('./routes/userRoutes');

const app = express();

dotenv.config({ path: './config.env' });

app.use(express.json()); //middleware to add the incoming body data to the request object
app.use(morgan('dev')); //middleware to log some request data

app.use('/quiz/app/api/v1', usersRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
