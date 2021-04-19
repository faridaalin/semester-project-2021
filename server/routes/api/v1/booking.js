const express = require('express');
const router = express.Router();

// /bookings
router.get('/', (req, res) => {
  res.send('All bookings');
});
// /bookings/:1
router.get('/:id', function (req, res) {
  res.send(`Bookin with ID`);
});

module.exports = router;
