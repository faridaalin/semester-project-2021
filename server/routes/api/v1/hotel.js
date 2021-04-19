const express = require('express');
const router = express.Router();

// /hotels
router.get('/', (req, res) => {
  res.send('Hotels');
});
// /hotels/2
router.get('/:id', function (req, res) {
  res.send(`Hotel with ID`);
});

module.exports = router;
