import dotenv from 'dotenv';

import express from 'express';
import router from './app/router.js';
import cors from 'cors';
import database from './database.js';

const app = express();

dotenv.config();

database();

// see it later
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use('/api', router);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`app : http://localhost:${PORT}`);
});