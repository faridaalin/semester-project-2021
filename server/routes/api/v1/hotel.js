const express = require('express');
const router = express.Router();

const hotelController = require('../../../controllers/hotel_controller');

console.log(hotelController.all_hotels);

// /hotels
router.get('/', hotelController.all_hotels);

// /hotels/4
router.get('/:id', hotelController.hotel_details);

// /hotels/create
router.post('/create', hotelController.hotel_create);

//  /hotels/4/update
router.patch('/:id/update', hotelController.hotel_update);

//  /hotels/4/delete
router.delete('/:id/delete', hotelController.hotel_delete);

module.exports = router;
