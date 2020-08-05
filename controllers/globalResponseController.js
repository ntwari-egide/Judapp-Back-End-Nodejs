const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

exports.sendResponseWithMessage = (req,res,statusCode,message)=>{
    res.status(statusCode).json({
        status: "success",
        message : message
    })
}

exports.sendResponseWithData = (req,res,statusCode,clientId,data)=>{
    res.status(statusCode).json({
        status: "success",
        clientId,
        results: data.length,
        data:data
    })
}

exports.sendResponseWithDataAndToken = (res,token,statusCode,user)=>{
        res.status(statusCode).json({
        status: "success",
        token,
        results: user.length,
        user
    })
}

exports.checkCorrectPassword = async function(candidatePass,password){
    return await bcrypt.compare(candidatePass,password)
}

exports.getMessageAndUserCredentails = async function(res,messages){
    let messageSenderId
    for(var i = 0; i<messages.length;i++){
        messageSenderId = messages[i].sendersId
    }

    
        console.log(messageSenderId)
        const clients = Message.find()
        console.log(clients)

        // res.status(200).json(clients)
}