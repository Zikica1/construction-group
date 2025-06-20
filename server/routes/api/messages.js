const express = require('express');
const router = express.Router();
const messagesController = require('../../controller/contactController');
const messageValidation = require('../../config/validation/messageValidation');
const validateRequest = require('../../middleware/validateRequest');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/role_list');

router
  .route('/')
  .get(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin),
    messagesController.getAllMessages
  )
  .post(
    messageValidation,
    validateRequest,
    messagesController.createNewMessage
  );

router
  .route('/:id')
  .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), messagesController.getMessage)
  .delete(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin),
    messagesController.deleteMessage
  );

module.exports = router;
