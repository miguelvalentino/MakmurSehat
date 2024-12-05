// /routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const Menu = require('../models/menuModel');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.getAll();
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.getById(req.params.id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (err) {
    console.error('Error fetching menu item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug input data
    const menuItem = await Menu.create(req.body);
    res.status(201).json(menuItem);
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});


// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.update(req.params.id, req.body);
    res.json(menuItem);
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    await Menu.delete(req.params.id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});


module.exports = router;
