const busImageController = require("../controllers/busImageController");
const router = require("express").Router();
router.post("/", busImageController.createBusImage);
router.get("/", busImageController.getBusImages);
router.get("/:id", busImageController.getBusImage);
router.delete("/:id", busImageController.deleteBusImage);
module.exports = router;