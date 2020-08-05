const mongoose = require("mongoose")

const servicesSchema = mongoose.Schema({
    serviceName: {
        type: String
    },
    cabinetId: {
        type: String
    },
    typeOfService: {
        type: String
    },
    description: {
        type: String
    },
    attorneyId: {
        type: String
    }
})

const Service = mongoose.model('services',servicesSchema)
module.exports = Service