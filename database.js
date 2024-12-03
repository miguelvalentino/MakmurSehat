const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi koneksi database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Cek koneksi
pool.connect()
    .then(() => console.log('Terhubung ke PostgreSQL'))
    .catch(err => console.error('Gagal terhubung ke PostgreSQL:', err));

module.exports = pool;
