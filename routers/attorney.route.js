const mongoose = require("mongoose")
const express = require("express")
const attorneyController  = require("./../controllers/attorneyController")
const cabinetController = require("./../controllers/cabinetController")
const router = express.Router()
router.route("/")
    .get(attorneyController.getAllAttorneys)
    .post(
        cabinetController.detectPresencebyId,
        attorneyController.createAttorney
        )
router.route("/byCabinetId/:cabinetId")
    .get(attorneyController.getAttorneyWithSameCabinet)

router.route("/:attorneyId")
    .put(attorneyController.updateAttorney)
    .delete(
        attorneyController.deleteAttorney
        )

router.route("/login")
        .post(
            attorneyController.login
            )


// 0787897607 isaac
module.exports = router