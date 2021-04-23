const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const messageController = require('../../controllers/messages_controller');
const validateSchema = require('../../middleware/yupValidation');
const schema = require('../../utils/messageSchema');

// /messages
router.get('/', auth, messageController.all_messages);

// /messages/4
router.get('/:id', auth, messageController.messages_details);

// /messages/create
router.post(
  '/create',
  validateSchema(schema.messageSchema),
  messageController.messages_create
);

//  /messages/4/delete
router.delete('/:id/delete', auth, messageController.messages_delete);

module.exports = router;
