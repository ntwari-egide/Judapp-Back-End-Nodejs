const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const cainetController = require("./../controllers/cabinetController")

var attorneySchema = mongoose.Schema({
    fullName : {
        type: String,
        require : "Full name is required, please"
    },
    email : {
        type: String,
        require : "Email is required, please" 
    },
    photo : {
        type: String
    },
    phoneNumber : {
        type: String,
        require : "Phone number is required, please" 
    },
    cabinetId : {
        type: String,
        require : "Cabinet Id is required, please" 
    },
    password : {
        type: String,
        require : "Password is required, please",
        minlength: 3
    },
    passwordConfirm : {
        type: String,
        require : "Password Confirmatioin is required, please",
        minlength: 3,
        // validate: {
        //     validator : function (el){
        //         return el === this.password
        //     }
        // },    
        select: false
    }    
})

attorneySchema.pre('save',async function (next){    
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next();
})

const Attorney = mongoose.model("attorney",attorneySchema)
module.exports = Attorney