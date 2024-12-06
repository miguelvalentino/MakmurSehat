const db = require('../database'); 

const Menu = {
  //query buat menu baru
  create: (data) => {
    const query = `
      INSERT INTO menus (name, description, price, image)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    return db.one(query, [data.name, data.description, data.price, data.image]);
  },

  //query ambil semua menu
  getAll: () => {
    const query = 'SELECT * FROM menus;';
    return db.any(query);
  },

  //ambil menu berdasar id
  getById: (id) => {
    const query = 'SELECT * FROM menus WHERE id = $1;';
    return db.oneOrNone(query, [id]);
  },

  //update menu 
  update: (id, data) => {
    const query = `
      UPDATE menus
      SET name = $1, description = $2, price = $3, image = $4 
      WHERE id = $5 RETURNING *;
    `;
    return db.one(query, [data.name, data.description, data.price, data.image, id]);
  },

  //delete menu
  delete: (id) => {
    const query = 'DELETE FROM menus WHERE id = $1;';
    return db.none(query, [id]);
  }
};

module.exports = Menu;
