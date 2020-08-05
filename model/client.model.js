const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

var clientSchema = mongoose.Schema({
    fullName : {
        type: String,
        require : "Full name is required, please"
    },
    photo : {
        type: String
    },
    phoneNumber : {
        type: String,
        require : "Phone number is required, please" 
    },
    provinceLoc : {
        type: String,
        require : 'Please you need to state district name'
    },
    districtLoc : {
        type: String,
        require : 'Please you need to state sector name'
    },
    sectorLoc : {
        type : String,
        require : 'Please you need to state cell name'
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

clientSchema.pre('save',async function (next){    
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next();
})

clientSchema.methods.checkCorrectPassword = async function(candidatePass,password){
    return await bcrypt.compare(candidatePass,password)
}

clientSchema.methods.changedPassword = async function(JWTTimestamp){
    if(this.passwordChangedAt){
        const millisecpasswordChangedAt = parseInt(this.passwordChangedAt.getTime() /1000 ,10)
        return JWTTimestamp < millisecpasswordChangedAt;
    }
    return false
}

const Client = mongoose.model("clients",clientSchema)
module.exports = Client