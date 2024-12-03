const pool = require('../database');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Signup function
const signup = async (req, res) => {
    const { name, email, no_telpon, password, confirmPassword } = req.body;

    const emailExists = await userModel.getUserByEmail(email);
    if (emailExists) {
        return res.status(400).send({ error: 'Email sudah terdaftar!' });
    }

    if (password !== confirmPassword) {
        return res.status(400).send({ error: 'Password atau konfirmasi password tidak cocok!' });
    }

    try {
        console.log('Password:', password);  // Debug: Check password
        const salt = await bcrypt.genSalt(10); // Generate salt
        console.log('Salt:', salt);  // Debug: Check salt
        
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the salt
        console.log('Hashed Password:', hashedPassword); // Debug: Check hashed password
        
        await userModel.createUser(name, email, no_telpon, hashedPassword);
        res.status(201).send({ message: 'Sign Up berhasil!' });
    } catch (err) {
        console.error('Error saat signup:', err);
        res.status(500).send({ error: 'Terjadi error saat mendaftar.' });
    }
};





// Signin
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) return res.status(404).send({ error: 'Pengguna tidak ditemukan!' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ error: 'Password salah!' });

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            no_telpon: user.no_telpon,
        };

        // Tambahkan ini ke dalam fungsi signin di bagian setelah login berhasil
    res.cookie('sessionID', req.sessionID, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Aktifkan secure hanya di production
        maxAge: 3600000, // Cookie berlaku selama 1 jam
    });


        res.status(200).send({ message: 'Login berhasil!', user: req.session.user });
    } catch (err) {
        console.error('Error saat signin:', err);
        res.status(500).send({ error: 'Terjadi kesalahan saat login.' });
    }
};

// Get Profile
const getProfile = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ error: 'Harap login terlebih dahulu!' });
    }
    res.status(200).send({ user: req.session.user });
};

// Logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error saat logout:', err);
            return res.status(500).send({ error: 'Gagal logout.' });
        }
        res.status(200).send({ message: 'Logout berhasil!' });
    });
};

module.exports = {
    signup,
    signin,
    getProfile,
    logout,
};
