const mongoose = require("mongoose")
const Workspace = require("./../model/workspace.model")
const Client = require("./../model/client.model")
const AppResponse = require('./../controllers/globalResponseController')
const AppError = require('./../utils/appError')

const sendWorkspaceCreaterCredentials = async  (res,req,workspace)=>{
        var clientDetailsHolder = []
    for(var i = 0; i<workspace.length;i++){
        var workspaceDetails = []
        clientId = workspace[i].cleintId
        var clientDetails = await Client.find({_id: clientId})
                
        workspaceDetails = Object.assign(
            {clientDetails: clientDetails}
        )

        clientDetailsHolder.push(workspaceDetails)
    }

   AppResponse.sendResponseWithData(req,res,200,null,clientDetailsHolder)
}

exports.createWorkspace = async (req,res) => {
    Workspace.create(req.body)
    next(AppResponse.sendResponseWithMessage(req,res,200,"you have created new workspace"))    
}

exports.getWorkspaceByClientId = async (req,res) => {
    const workspace =await Workspace.find({cleintId: req.params.clientId})
    if(workspace.length !=0){
       AppResponse.sendResponseWithData(req,res,200,null,workspace)
    }
    else{
        new AppError( `There is no workspace with ClientId`,404)
    }   
}

exports.sendAllResponseToClient = async (res,token,statusCode,user) => {
    const workspace= Workspace.find({workspaceId: user._id})
    res.status(statusCode)
        .json({
            status: "success",
            token,
            workspace,
            user
        })
}

exports.deleteWorkspace = async (req,res) => {
    Workspace.findOneAndRemove({_id: req.params.WorkspaceId},(err) =>{
        if(!err){
            next(AppResponse.sendResponseWithMessage(req,res,200,"The coart is finished now you can have deleted"))              
        }
    })
}

exports.getWorkspaceByCabinetId = async (req,res) => {
    const workspace =await Workspace.find({cabinetId: req.params.cabinetId,finishedTask: false})
    if(workspace.length !=0){
       sendWorkspaceCreaterCredentials(res,req,workspace)
    }
    else{
        return next(AppResponse.sendResponseWithMessage(req,res,200,"There is no client joined your cabinet"))              
    }   
}