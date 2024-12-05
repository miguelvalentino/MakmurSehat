const pgp = require('pg-promise')();
require('dotenv').config();

//konfigurasi koneksi ke PostgreSQL
const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//pastiin koneksi berhasil
db.connect()
  .then(obj => {
    console.log('Terhubung ke PostgreSQL');
    obj.done(); 
  })
  .catch(err => {
    console.error('Gagal terhubung ke PostgreSQL:', err);
  });

module.exports = db;
