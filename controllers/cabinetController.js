const mongoose = require("mongoose")
const Cabinet = require("../model/cabinet.model")
const AppResponse = require('./../controllers/globalResponseController')
const AppError = require('./../utils/appError')

const nearlyCabinet = (cabinet,token,clientId,res) => {
    const req=""
     AppResponse.sendResponseWithData(req,res,200,clientId,cabinet)
}

exports.checkNearByCabinet =async (province,district,sector,token,clientId,res,next)=>{
    const cabinetBySector = await Cabinet.find({sectorLoc: sector})
    const cabinetByDistrict = await Cabinet.find({districtLoc: district})
    const cabinetByProvince = await Cabinet.find({provinceLoc: province})
    const allCabinets = await Cabinet.find()

    if(cabinetBySector.length != 0){
        nearlyCabinet(cabinetBySector,token,clientId,res)
    }
    else if(cabinetByDistrict.length != 0){
        nearlyCabinet(cabinetByDistrict,token,clientId,res)
    }
    else if(cabinetByProvince.length != 0){
        nearlyCabinet(cabinetByProvince,token,clientId,res)
    }
    else if(allCabinets.length != 0){
        nearlyCabinet(allCabinets,token,clientId,res)
    }
    else{
        next(new AppError(`There is no cabinet with id ${req.params.id}`,404)) 
    }
}

exports.removeAttorneyInCabinet = async  (req,res,next) =>{
    await Cabinet.findOneAndUpdate({_id: req.params.attorneyId},{attorneysNumber: (attorneysNumber*1)-1},{new: true},(err) => {
        if(!err){
            next();
        }
        else{
            next(new AppError(`There is no cabinet with id ${req.params.id}`,404))
        } 
    })

}

exports.detectPresencebyId = async  (req,res,next) =>{
        const cabinets = await Cabinet.findById(req.body.cabinetId)
            if(!cabinets){
               return next(new AppError(`There is no cabinet with id ${req.body.cabinetId}`,404))                
            }
            else{
                return next()
            }
}


exports.getAllCabinets =  (req,res,next) => {
    Cabinet.find()
    .then(cabinets => {
        if(cabinets.length != 0){
            next(AppResponse.sendResponseWithData(req,res,200,cabinets))           
        }
        else{
            next(new AppError(`There is no cabinet registered`,404))  
        }
    })
}

exports.createCabinet = (req,res) => {
    const cabinet = Cabinet.create(req.body)
    next(AppResponse.sendResponseWithMessage(req,res,200,'Created new cabinet'))   
}

exports.getCabinetById = async(req,res,next) => {
  const  cabinets = await Cabinet.findById(req.params.id)
        if(cabinets){
            next(AppResponse.sendResponseWithData(req,res,200,null,cabinets)) 
        }
        else{
            next(new AppError(`There is no cabinet with id ${req.params.id}`,404))            
        }
}

exports.updateCabinet = (req,res,next) =>{
    Cabinet.findOneAndUpdate({_id: req.params.id},req.body,{new: true},(err) => {
        if(!err){
            next(AppResponse.sendResponseWithMessage(req,res,200,"Updated the cabinet"))              
        }
        else{
            next(new AppError(`There is no cabinet with id ${req.params.id}`,404)) 
        }
    })
}
    

exports.deleteCabinet = (req,res,next) =>{
    Cabinet.findOneAndRemove({_id: req.params.id},(err) =>{
        if(!err){
            next(AppResponse.sendResponseWithMessage(req,res,200,"Deleted the cabinet"))             
        }
        else{
            next(new AppError(`There is no cabinet with id ${req.params.id}`,404))   
        }
    })
}