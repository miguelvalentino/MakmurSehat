// /models/menuModel.js
const db = require('../database'); // import database connection

const Menu = {
  // Create a new menu item
  create: (data) => {
    const query = `
      INSERT INTO menus (name, description, price, image)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    return db.one(query, [data.name, data.description, data.price, data.image]);
  },

  // Get all menu items
  getAll: () => {
    const query = 'SELECT * FROM menus;';
    return db.any(query);
  },

  // Get a menu item by ID
  getById: (id) => {
    const query = 'SELECT * FROM menus WHERE id = $1;';
    return db.oneOrNone(query, [id]);
  },

  // Update a menu item
  update: (id, data) => {
    const query = `
      UPDATE menus
      SET name = $1, description = $2, price = $3, image = $4 
      WHERE id = $5 RETURNING *;
    `;
    return db.one(query, [data.name, data.description, data.price, data.image, id]);
  },

  // Delete a menu item
  delete: (id) => {
    const query = 'DELETE FROM menus WHERE id = $1;';
    return db.none(query, [id]);
  }
};

module.exports = Menu;
