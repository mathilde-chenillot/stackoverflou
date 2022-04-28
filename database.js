const mongoose = require('mongoose');

const database = mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => console.log('Connection to MongoDB successful !'))
.catch((err) => console.log('Connection to MongoDB failed !', err));

module.exports = database;