const express = require('express');
const db = require('../db/database');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// Update topic completion
router.post('/update', requireAuth, (req, res) => {
  const { topic_id, completed } = req.body;
  const user_id = req.user.id;
  const now = new Date().toISOString();
  db.run(
    `INSERT OR REPLACE INTO progress (user_id, topic_id, completed, completed_at)
     VALUES (?, ?, ?, ?)`,
    [user_id, topic_id, completed ? 1 : 0, now],
    function(err) {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ updated: true });
    }
  );
});

module.exports = router;
