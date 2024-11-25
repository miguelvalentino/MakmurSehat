const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'makmurSehat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, //1 hari
            secure: false,
        },
    })
);

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

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        //cek user ada di database
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || user.password !== password) {
            return res.status(401).send({ error: 'Email atau password salah!' });
        }

        //save session user
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            no_telpon: user.no_telpon,
        };

        res.status(200).send({ message: 'Login berhasil!', user: req.session.user });
    } catch (err) {
        res.status(500).send({ error: 'Terjadi kesalahan pada server.' });
    }
});

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ error: 'Harap login terlebih dahulu!' });
    }

    res.status(200).send({ user: req.session.user });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ error: 'Gagal logout.' });
        }
        res.status(200).send({ message: 'Logout berhasil!' });
    });
});

app.listen(5000, () => console.log('Server berjalan di port 5000'));
