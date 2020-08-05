const express = require("express")
const serviceController = require("./../controllers/servicesController")

const Router = express.Router()

Router.route("/")
    .post(serviceController.createService)

Router.route("/:id")
    .put(serviceController.updateService)
    .delete(serviceController.deleteService)

Router.route("/getservicesByType/:type/:cabinetId")
    .get(serviceController.getServiceByType)

Router.route("/getByCabinetId/:cabinetId")
    .get(serviceController.getServiceByCabinetId)

module.exports = Router
