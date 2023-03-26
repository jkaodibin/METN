const router = require('express').Router();
const authController = require('../../controllers/auth.controller');
const {} = require('../../middleware/auth.middleware');
const multer = require("multer");
const upload = multer();

router.post('/signIn', authController.signIn);
router.post('/signUp', authController.signUp);
router.get('/signOut', authController.signOut);
// router.delete('/:id', offerController.deleteOffer);

module.exports = router;