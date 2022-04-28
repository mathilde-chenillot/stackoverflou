require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./app/router');
const cors = require('cors');

const database = require('./database');

const PORT = process.env.PORT || 3500;

// see it later
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use(router);

app.listen(PORT, () => {
    console.log(`app : http://localhost:${PORT}`);
    database;
});