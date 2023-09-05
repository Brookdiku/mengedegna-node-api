const busImageController = require("../controllers/busImageController");
const router = require("express").Router();
const multer = require('multer')
const path = require('path'); // Add the path module
const destinationPath = path.join(__dirname, '..', 'images');
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}__${file.originalname}`);
    }
})
const upload = multer({
    storage: imageStorage
})
router.post("/", upload.array("image"), busImageController.createBusImage);
router.get("/", busImageController.getBusImages);
router.get("/:id", busImageController.getBusImage);
router.delete("/:id", busImageController.deleteBusImage);
module.exports = router;