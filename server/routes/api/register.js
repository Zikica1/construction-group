const express = require('express');
const router = express.Router();
const registerController = require('../../controller/registController');

router.post('/', registerController.handleUsers);

module.exports = router;
