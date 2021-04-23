const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const hotelController = require('../../controllers/hotel_controller');
const validateSchema = require('../../middleware/yupValidation');
const schema = require('../../utils/hotelShema');

// /hotels
router.get('/', hotelController.all_hotels);

// /hotels/4
router.get('/:id', hotelController.hotel_details);

// /hotels/create
router.post(
  '/create',
  auth,
  validateSchema(schema.hotelSchema),
  hotelController.hotel_create
);

//  /hotels/4/update
router.patch(
  '/:id/update',
  auth,
  validateSchema(schema.hotelSchemaUpdate),
  hotelController.hotel_update
);

//  /hotels/4/delete
router.delete('/:id/delete', auth, hotelController.hotel_delete);

module.exports = router;
