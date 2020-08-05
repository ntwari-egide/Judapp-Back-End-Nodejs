const express = require("express")
const cabinetController = require("./../controllers/cabinetController")
const router = express.Router()

router.route("/")
    .get(cabinetController.getAllCabinets)
    .post(cabinetController.createCabinet)


router.route("/:id")
    .get(cabinetController.getCabinetById)
    .put(cabinetController.updateCabinet)
    .delete(cabinetController.deleteCabinet)

module.exports = router