const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/judapp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err) console.log("MongoDb Connection is currently being run ")
    else{
        console.log("Error : "+err);
    }
});

require("./cabinet.model")
require("./client.model")