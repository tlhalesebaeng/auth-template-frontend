const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
    console.log('DB connection successful!');
});

let port;
if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT || 3000;
} else {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
