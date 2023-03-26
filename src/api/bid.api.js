const router = require('express').Router();
const bidController = require('../../controllers/bid.controller');
const {requireAuth} = require('../../middleware/auth.middleware');
const {checkBidIsMine} = require('../../middleware/bidMiddleware');
const multer = require("multer");
const upload = multer();

router.get('/',requireAuth, bidController.viewBids);
router.post('/',requireAuth,bidController.createBid);
router.put('/:id',[requireAuth,checkBidIsMine],bidController.updateBid);
router.delete('/:id',[requireAuth,checkBidIsMine], bidController.deleteBid);

module.exports = router;