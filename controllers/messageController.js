const mongoose = require("mongoose")
const Message = require('./../model/message.model')
const Client = require('./../model/client.model')
const Attorney = require('./../model/attorney.model')
const AppResponse = require('./../controllers/globalResponseController')
const AppError = require('./../utils/appError')
var db = mongoose.connection

const sendMessageAndSendersCredential = async  (res,req,messages)=>{
    const messageContent = []
    let messageSenderId
    for(var i = 0; i<messages.length;i++){
        var messageDetails = []

        messageSenderId = messages[i].sendersId
        var sendersDetails = await Client.find({_id: messageSenderId})
        if(sendersDetails.length == 0){
            sendersDetails = await Attorney.find({_id: messageSenderId})
        }        
        messageDetails = Object.assign(
            {message: messages[i]},
            {sendersDetails: sendersDetails}
        )

        messageContent.push(messageDetails)
    }

    if(messages.length != 0){
       return AppResponse.sendResponseWithData(req,res,200,null,messageContent)        
    }
    else{
         AppResponse.sendResponseWithMessage(req,res,200,`Start of conversation of general messages to you and cabinet`)       
    }
}

exports.createMessage  = async (req,res,next) => {
    Message.create(req.body)
    return AppResponse.sendResponseWithMessage(req,res,200,"the message is sent")    
}

exports.udpateMessage = async (req,res,next) => {
    await Message.findOneAndUpdate({_id:req.params.id},req.body,{new: true},(err) => {
        if(!err){
             next(AppResponse.sendResponseWithMessage(req,res,200,"Updated the message"))
        }
        else{
            next(new AppError(`There is no message with id ${req.params.id}`,404))              
        }
    })
}

exports.deleteMessage = async(req,res,next) => {
    await Message.findOneAndRemove({_id: req.params.id},(err) =>{
        if(!err){
            next(AppResponse.sendResponseWithMessage(req,res,200,"Deleted the message"))            
        }
    })    
}

exports.allMessagesAreSeen = async (req,res,next) => {
    await Message.findOneAndUpdate({seen:false},{seen:true},{new: true},(err) => {
        if(!err){
            next(AppResponse.sendResponseWithMessage(req,res,200,"Now all messages are seen"))            
        }
    })
}

// exports.getGeneralMessageByCabinetId = async (req,res,next)

exports.getMessagesByWorskspaceID = async (req,res,next) => {
    const messages= await Message.find({workspaceId:req.params.id,general: true})

    sendMessageAndSendersCredential(res,req,messages)
}

exports.getUnSeenMessages = async (req,res,next) => {
    const messages= await Message.find({seen:false})
    if(messages.length != 0){
        next(AppResponse.sendResponseWithData(req,res,200,messages))
    }
    else{
        next(AppResponse.sendResponseWithMessage(req,res,200,`All messages are seen`))        
    }
}

exports.getUpdatedMessage = async (req,res,next) => {
    const messages= await Message.find({updated:true})
    if(messages.length != 0){
        next(AppResponse.sendResponseWithData(req,res,200,messages))        
    }
    else{
        next(new AppError(`All messages are not updated`,404))         
    }
}
exports.getChat = async (req,res,next) => {
    const messages= await Message.find({$or: [
        {general: false,sendersId:req.params.sendersId , receiversId:req.params.recieversId },
        {general: false,sendersId:req.params.recieversId , receiversId:req.params.sendersId }
    ]})

    sendMessageAndSendersCredential(res,req,messages) 
}

exports.getGeneralClientMsg = async (req,res)=>{
    const messages= await Message.find({cabinetId:req.params.cabinetId,clientGeneral: true})
    
    if(messages.length != 0){
        return sendMessageAndSendersCredential(res,req,messages) 
    }
    else{
        return AppResponse.sendResponseWithMessage(req,res,200,`Start the chat in general with clients`)
    }
}

exports.getGeneralCabinetMsg = async (req,res)=>{
    const messages= await Message.find({cabinetId:req.params.cabinetId,cabinetGeneral: true})
    
    if(messages.length != 0){
        return sendMessageAndSendersCredential(res,req,messages) 
    }
    else{
        return res.status(200).json({
            status: "success",
            message: `Start the chat in general with your cabinet` 
        })
    }
}

