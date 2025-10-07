const express = require('express');
const router = express.Router();
const db = require('../db/database');
const requireAuth = require('../middleware/requireAuth');

// Enroll in category
router.post('/enroll', requireAuth, (req, res) => {
  const user_id = req.user.id;
  const { category_id } = req.body;
  db.run(
    `INSERT OR IGNORE INTO enrollments (user_id, category_id) VALUES (?, ?)`,
    [user_id, category_id],
    function(err) {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ enrolled: true });
    }
  );
});

// Get user's enrolled categories
router.get('/my-categories', requireAuth, (req, res) => {
  const user_id = req.user.id;
  db.all(
    `SELECT category_id FROM enrollments WHERE user_id = ?`,
    [user_id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows.map(r => r.category_id));
    }
  );
});

module.exports = router;
