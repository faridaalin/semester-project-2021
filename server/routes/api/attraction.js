const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const attractionsController = require('../../controllers/attractions_controller');
const validateSchema = require('../../middleware/yupValidation');
const schema = require('../../utils/attractionSchema');

// /attractions
router.get('/', attractionsController.all_attractions);

// /messages/4
router.get('/:id', auth, attractionsController.attraction_details);

// /messages/create
router.post(
  '/create',
  auth,
  validateSchema(schema.attractionSchema),
  attractionsController.attraction_create
);

//  /messages/4/delete
router.delete('/:id/delete', auth, attractionsController.attraction_delete);

module.exports = router;
