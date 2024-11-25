const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./database.js'); // Pastikan Anda sudah mengatur koneksi database di file db.js

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Jika login berhasil, arahkan ke halaman profil
        res.status(200).json({ 
            id: user.rows[0].id, 
            name: user.rows[0].name, 
            email: user.rows[0].email 
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
