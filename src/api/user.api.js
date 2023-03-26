const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const userController = require("../../controllers/user.controller");
const uploadController = require('../../controllers/upload.controller');
const {requireAuth} = require('../../middleware/auth.middleware');
const {checkUserIsMe} = require('../../middleware/userMiddleware');
const multer = require("multer");
const upload = multer();


// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id",[requireAuth,checkUserIsMe], userController.updateUser);
router.delete("/:id",[requireAuth,checkUserIsMe], userController.deleteUser);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
