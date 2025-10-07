const express = require('express');
const db = require('../db/database');
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();

// Add Category
router.post('/category', requireAuth, requireAdmin, (req, res) => {
  const { name, description } = req.body;
  db.run(
    `INSERT INTO categories (name, description) VALUES (?, ?)`,
    [name, description],
    function(err) {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ id: this.lastID, name, description });
    }
  );
});

// View all Users
router.get('/users', requireAuth, requireAdmin, (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// Get all categories
router.get('/categories', (req, res) => {
  db.all(`SELECT * FROM categories`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

module.exports = router;
