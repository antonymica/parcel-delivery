const express = require("express");
const router = express.Router();
const parcelController = require("../controllers/parcelController");

router.get("/", parcelController.homepage);
router.get("/about", parcelController.about);
router.get("/add", parcelController.addParcel);
router.post("/add", parcelController.postParcel);
router.get("/view/:id", parcelController.view);
router.get("/edit/:id", parcelController.edit);
router.put("/edit/:id", parcelController.editPost);
router.delete("/edit/:id", parcelController.deleteParcel);
router.post("/search", parcelController.searchParcels);

module.exports = router;
