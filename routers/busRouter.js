const  busController= require("../controllers/busController");
const router = require("express").Router();
router.post("/",busController.createBus);
router.get("/",busController.getBuses);
router.get("/:id",busController.getBus);
router.put("/:id",busController.updateBus);
router.delete("/:id",busController.deleteBus);
module.exports=router;