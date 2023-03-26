const router = require('express').Router();
const offerController = require('../../controllers/offer.controller');
const {requireAuth} = require('../../middleware/auth.middleware');
const {checkOfferIsMine} = require('../../middleware/offerMiddleware');
const multer = require("multer");
const upload = multer();

router.get('/', offerController.viewOffers);
router.post('/',requireAuth,offerController.createOffer);
router.put('/:id',[requireAuth,checkOfferIsMine],offerController.updateOffer);
router.delete('/:id',[requireAuth,checkOfferIsMine], offerController.deleteOffer);

module.exports = router;