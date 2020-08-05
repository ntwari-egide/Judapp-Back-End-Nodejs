const Client = require("./../model/client.model")
const jwt = require("jsonwebtoken")
const cabinetController = require("./cabinetController")
const AppError = require('./../utils/appError')
const AppResponse = require("./globalResponseController")

exports.getClientByPhonenumber = async(req,res,next)=>{
    const client = await Client.find({phoneNumber:req.body.phoneNumber}); 
    next(AppResponse.sendResponseWithData(req,res,200,client))  
}