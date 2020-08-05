const mongoose = require("mongoose")

const cabinetSchema = mongoose.Schema({
    cabinetName : {
        type: String,
        require : 'Please you need to state cabinet name'
    },
    attorneysNumber : {
        type: Number
    },
    headCabinetEmail : {
        type: String,
        require : 'Please you need to state province name'
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
    }
})

const Cabinet = mongoose.model('cabinet',cabinetSchema)
module.exports = Cabinet