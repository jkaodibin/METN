const router = require('express').Router();
const messageController = require('../../controllers/message.controller');
const {requireAuth} = require('../../middleware/auth.middleware');
const {checkMessageIsMine,checkReceiverExist} = require('../../middleware/messageMiddleware');
const multer = require("multer");
const upload = multer();

router.get('/',requireAuth, ()=>{});

module.exports = router;