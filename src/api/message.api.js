const router = require('express').Router();
const messageController = require('../../controllers/message.controller');
const {requireAuth} = require('../../middleware/auth.middleware');
const {checkMessageIsMine,checkReceiverExist} = require('../../middleware/messageMiddleware');
const multer = require("multer");
const upload = multer();

router.get('/',requireAuth, messageController.viewMessages);
router.post('/',[requireAuth,checkReceiverExist],messageController.createMessage);
// router.put('/:id',[requireAuth,checkMessageIsMine],messageController.updateOffer);
router.delete('/:id',[requireAuth,checkMessageIsMine], messageController.deleteMessage);

module.exports = router;