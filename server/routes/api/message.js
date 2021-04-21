const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const messageController = require('../../controllers/messages_controller');

// /messages
router.get('/', auth, messageController.all_messages);

// /messages/4
router.get('/:id', auth, messageController.messages_details);

// /messages/create
router.post('/create', messageController.messages_create);

//  /messages/4/update
router.patch('/:id/update', messageController.messages_update);

//  /messages/4/delete
router.delete('/:id/delete', auth, messageController.messages_delete);

module.exports = router;
