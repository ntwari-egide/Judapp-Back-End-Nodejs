const Service = require("./../model/services.model")
const Attorney = require("./../model/attorney.model")
const AppResponse = require('./../controllers/globalResponseController')
const AppError = require('./../utils/appError')

const sendServicesAndAttorneyDetails = async  (res,req,services)=>{
    const servicesContainer = []
    let attorneyId
    for(var i = 0; i<services.length;i++){
        var serviceDetails = []

        attorneyId = services[i].attorneyId
//         console.log(attorneyId)
        var attorneyDetails = await Attorney.find({_id: attorneyId})
//         console.log(attorneyDetails)
       
        serviceDetails = Object.assign(
            {service: services[i]},
            {AttorneyDetails: attorneyDetails}
        )

        servicesContainer.push(serviceDetails)
    }

    if(services.length != 0){
       return AppResponse.sendResponseWithData(req,res,200,null,servicesContainer)        
    }
    else{
        return next(new AppError(`There is no service with cabinet id ${req.params.cabinetId}`,404))       
    }
}

exports.createService = async ( req,res,next)=> {
    await Service.create(req.body)
    return next(AppResponse.sendResponseWithMessage(req,res,200,'Created new service'))
}
exports.getServiceByType = async (req,res,nex) => {
    const services = await Service.find({$and : [{typeOfService: req.params.type},{cabinetId: req.params.cabinetId}]})

    if(services.length == 0){
        return AppResponse.sendResponseWithMessage(req,res,200,`the services in ${req.params.type} is not found`)
    }
    return sendServicesAndAttorneyDetails(res,req,services)
}

exports.updateService = async (req,res,next)=> {
    await Service.findOneAndUpdate({_id: req.params.id},req.body,{new: true},(err) => {
        if(err){
            return next(AppResponse.sendResponseWithMessage(req,res,200,`the services is updated`)) 
        }
        return next(new AppError(`There is no service with id ${req.params.id}`,404))
    })
}

exports.deleteService = async (req,res,next)=> {
    await Service.findOneAndRemove({_id: req.params.id},(err) => {
        if(err){
            return next(AppResponse.sendResponseWithMessage(req,res,200,`the services is deleted`)) 
        }
        return next(new AppError(`There is no service with id ${req.params.id}`,404))
    })
}


exports.getServiceByCabinetId = async (req,res,next)=> {
    const services = await Service.find({cabinetId: req.params.cabinetId})
        if(services.length ==  0){
            return next(new AppError(`There is no service with cabinet id ${req.params.cabinetId}`,404)) 
        }
        return next(AppResponse.sendResponseWithData(req,res,200,null,services))
    
}