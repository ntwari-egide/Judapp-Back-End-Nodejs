const mongoose = require("mongoose")

const workspaceSchema = mongoose.Schema({
    cleintId : {
        type: String,
        require : 'Please you need to state client Id'
    },
    cabinetId : {
        type: String,
        require : 'Please you need to state cabinetId name'
    },
    finishedTask : {
        type: Boolean,
        default: false
    }
})

const Workspace = mongoose.model('workspaces',workspaceSchema)
module.exports = Workspace