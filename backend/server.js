const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
    console.log('DB connection successful!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
