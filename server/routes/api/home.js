const express = require('express');
const router = express.Router();

const homeController = require('../../controllers/home_controller');

router.get('/logout', homeController.home);

module.exports = router;
