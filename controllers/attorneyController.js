const mongoose = require("mongoose")
const Attorney = require("../model/attorney.model")
const jwt = require("jsonwebtoken")
const AppResponse = require('./../controllers/globalResponseController')
const AppError = require('./../utils/appError')

exports.getAllAttorneys = (req,res,next) => {
    Attorney.find()
    .then(attorneys => {
        if(attorneys.length != 0){
            next(AppResponse.sendResponseWithData(req,res,201,attorneys))            
        }
        else{
            next(new AppError(`There is no attorney registered`,404))
        }
    })
}

const assignToken = id => {
    // console.log(id)
    return jwt.sign({id},
        process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_IN})

}

const sendToken = (user,statusCode,res) => {
    const token = assignToken(user._id)
    AppResponse.sendResponseWithDataAndToken (res,token,statusCode,user)
}


exports.createAttorney = (req,res,next) => {
    const attorney = Attorney.create(req.body)
    const token = assignToken(attorney.id)

    next(AppResponse.sendResponseWithMessage(req,res,201,"Created new attorney"))   
}

exports.getAttorneyWithSameCabinet = async (req,res,next) => {
    const attorneys  =await Attorney.find({cabinetId:req.params.cabinetId})
    if(attorneys.length != 0){
        next(AppResponse.sendResponseWithData(req,res,200,null,attorneys))         
    }
    else{
        next(new AppError(`There is no attorney with cabinet id ${ req.params.cabinetId}`,404))
    }
}

exports.updateAttorney = async (req,res,next) =>{
    await Attorney.findByIdAndUpdate({_id: req.params.attorneyId},req.body,{new: true},(err) => {
        if(!err){
           next(AppResponse.sendResponseWithMessage(req,res,201,'updated the attorney')) 
        }
    })
}

exports.login = async(req,res,next)=> {
    const {email,password} = req.body
        if(!email || !password){            
         next(new AppError(`Please email or password should be provided`,404))
    }
    const attorney = await Attorney.find({email}).select('+password')
//     console.log(attorney)
//      if(attorney.length == 0 || await !AppResponse.checkCorrectPassword(password,attorney.password)){
//         next(new AppError(`Please email or password are not incorrect`,404))
//     }
    sendToken(attorney,200,res)
}

exports.deleteAttorney = async (req,res) => {
    await Attorney.findByIdAndRemove({_id: req.params.attorneyId},(err) =>{
        if(!err){
            next(AppResponse.sendResponseWithMessage(req,res,201,'Deleted the attorney'))            
        }
    })
}