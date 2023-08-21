const authController = require("../controllers/authController");
const router = require("express").Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/token", authController.token);
module.exports = router;