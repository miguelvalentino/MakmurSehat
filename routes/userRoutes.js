const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Pastikan bcryptjs diinstal
const jwt = require('jsonwebtoken'); 

//untuk autentikasi user
const authenticateUser = async (email, password) => {
  const user = await User.findByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
      return user;
  } else {
      return null;
  }
};

//buat session token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', //token valid selama 1 jam
    });
};

//signup
router.post('/signup', async (req, res) => {
  try {
      const existingUser = await User.findByEmail(req.body.email); //cek email sudah terdaftar atau belum
      if (existingUser) {
          return res.status(400).json({ error: 'Email sudah terdaftar' });
      }
      //dihash passwordnya sebelum disave
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
          ...req.body,
          password: hashedPassword,
      });
      res.status(201).json(user);
  } catch (err) {
      console.error('Error di /signup:', err.message);
      res.status(400).json({ error: err.message });
  }
});


//signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body; 
  try {
      const user = await authenticateUser(email, password); //autentikasi user
      if (user) {
          const token = generateToken(user);
          res.json({ token }); //token kirim ke user kalau sudah
      } else {
          console.log('Kredensial tidak valid');
          res.status(401).json({ error: 'Invalid credentials' });
      }
  } catch (err) {
      console.error('Error di /signin:', err.message);
      res.status(500).json({ error: err.message });
  }
});



//profile
router.get('/profile', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; //ambil token dari header
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifikasi token
        const user = await User.findById(decoded.id); //cari data user berdasarkan token
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

//update profile
router.put('/update', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const updatedData = { //data yang di update
          name: req.body.name,
          no_telpon: req.body.no_telpon,
          pekerjaan: req.body.pekerjaan,
          negara_asal: req.body.negara_asal,
      };
      const user = await User.update(decoded.id, updatedData); //update data
      res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
      console.error('Error di /update:', err.message);
      res.status(400).json({ error: err.message });
  }
});



// Delete User
router.delete('/profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await User.delete(decoded.id); //delete user berdasarkan ID dari token

      res.json({ message: 'User deleted successfully' });
  } catch (err) {
      console.error('Error deleting user:', err.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});

  
// Update Password
router.put('/password', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { oldPassword, newPassword } = req.body; //cek password lama dan baru
    if (!bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }
    //ngehash password baru
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    const updatedUser = await User.updatePassword(decoded.id, hashedNewPassword);
    res.json({ message: 'Password updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
