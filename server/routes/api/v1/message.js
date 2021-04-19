const express = require('express');
const router = express.Router();

// /messages
router.get('/', (req, res) => {
  res.send('All messages');
});
// /messages/:1
router.get('/:id', function (req, res) {
  res.send(`Message with ID`);
});

module.exports = router;
