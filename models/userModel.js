const db = require('../database'); //import database

const User = {

  //untuk buat user baru
  create: (data) => {
    //query SQL untuk memasukkan data user ke tabel `users`
    const query = `
      INSERT INTO users (name, email, password, no_telpon, pekerjaan, negara_asal)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    //return hasil dari database, termasuk data user yang dibuat
    return db.one(query, [
      data.name,     
      data.email,   
      data.password,   
      data.no_telpon,  
      data.pekerjaan,  
      data.negara_asal 
    ]);
  },

  //untuk mencari user berdasarkan email
  findByEmail: (email) => 
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]),
  //untuk cari pengguna berdasarkan ID
  findById: (id) => 
    db.oneOrNone('SELECT * FROM users WHERE id = $1;', [id]),

  //untuk update data user
  update: (id, data) => {
    //query SQL untuk update data user berdasarkan ID
    const query = `
      UPDATE users 
      SET name = $1, no_telpon = $2, pekerjaan = $3, negara_asal = $4 
      WHERE id = $5 RETURNING *;
    `;
    //return data user yang diupdate
    return db.one(query, [
      data.name,       
      data.no_telpon,   
      data.pekerjaan,   
      data.negara_asal, 
      id                
    ]);
  },

  //untuk update password user
  updatePassword: (id, newPassword) => {
    //query SQL untuk update kolom `password` pada user
    const query = `
      UPDATE users 
      SET password = $1
      WHERE id = $2 RETURNING *;
    `;
    //return data user yang diubah passwordnya
    return db.one(query, [newPassword, id]);
  },

  //untuk hapus akun user
  delete: async (id) => {
    //cek user ada di database
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1;', [id]);
    if (!user) {
      //jika tidak ditemukan, muncul error
      throw new Error('user tidak ditemukan');
    }
    //jika ditemukan, hapus user dari tabel `users`
    return db.none('DELETE FROM users WHERE id = $1;', [id]);
  },
};

//export objek `User` 
module.exports = User;
