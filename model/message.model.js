const mongoose = require("mongoose")

var messageSchema = mongoose.Schema({
    workspaceId : {
        type: String
    },
    sendersId : {
        type: String 
    },
    receiversId : {
        type: String
    },
    messageContent : {
        type: String
    },
    recordedAt : {
        type: Date
    },
    seen : {
        type: Boolean,
        default: false
    },
    cabinetGeneral: {
        type: Boolean
    },
    clientGeneral: {
      type: Boolean  
    },
    cabinetId: {
        type: String
    },
    updated : {
        type: Boolean,
        default: false
    },
    general: false,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry : Date
})

messageSchema.pre('save', function(next){
    this.recordedAt = Date.now()
    next()
})

const Message = mongoose.model("messages",messageSchema)
module.exports = Message