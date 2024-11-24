const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//connect ke database pake .env
const app = express();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//kalo gagal muncul error
pool.connect().catch(err => console.error('Gagal terhubung ke PostgreSQL:', err));

app.use(cors());
app.use(bodyParser.json());

//endpoint
app.post('/signup', async (req, res) => {
    const { name, email, no_telpon, password, confirmPassword } = req.body;

    //agar password dan konfirmasi password sama
    if (password !== confirmPassword) return res.status(400).send({ error: 'Password atau konfirmasi Password tidak cocok!' });

    //buat masukin data ke database
    try {
        await pool.query(
            'INSERT INTO users (name, email, no_telpon, password) VALUES ($1, $2, $3, $4)',
            [name, email, no_telpon, password]
        );
        res.status(201).send({ message: 'Sign Up berhasil!' });
    } catch {
        res.status(500).send({ error: 'Terjadi error.' });
    }
});

app.listen(5000, () => console.log('Server berjalan di port 5000'));
