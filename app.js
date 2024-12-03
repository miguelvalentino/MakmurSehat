const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:3000',  // Alamat frontend Anda
    credentials: true,               // Izinkan cookie dan sesi
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'makmurSehat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 hari
            secure: false,
        },
    })
);

// Routes
app.use('/api/users', userRoutes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
