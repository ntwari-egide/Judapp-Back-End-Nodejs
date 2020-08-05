const Client = require("./../model/client.model")
const jwt = require("jsonwebtoken")
const cabinetController = require("./cabinetController")
const AppError = require('./../utils/appError')
const AppResponse = require("./globalResponseController")
const WorkspaceController = require("./workspaceController")

const assignToken = id => {
    return jwt.sign({id},
        process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_IN})

}

const sendToken = (user,statusCode,res) => {
    const token = assignToken(user.id)
    user.password = undefined
    req = ""
    console.log(user.id);
    AppResponse.sendResponseWithDataAndToken(res,token,200,user)   
}

exports.signupClient = async (req,res) => {
    const newClient = await Client.create(req.body)
    const token = assignToken(newClient.id)
    cabinetController.checkNearByCabinet(req.body.provinceLoc,req.body.districtLoc,req.body.sectorLoc,token,newClient.id,res) 
}

exports.loginClient = async (req,res,next) => {
    const {phoneNumber,password} = req.body
    if(!phoneNumber || !password){
        next(new AppError(`Please phone number or password should be provided`,404))         
    }
    else{        
    const client = await Client.find({phoneNumber}).select('+password')
//     if(!client || ! (await client.checkCorrectPassword(password,client.password))){
//         res.status(404).json({
//             status : "Error",
//             message : "Phone number email or password are incorrect "
//          })
//     }
    sendToken(client,200,res)
    }
}

// exports.

exports.protect = async (req,res,next)=> {
    let token;
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token)
    if(!token){
        next(new AppError(`Please you should login in to do this task`,404))        
    }
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded)
    const freshClient = await Client.findById(decoded.id)
    if(!freshClient){
        next(new AppError(`Please the client is not still found`,404)) 
    }

    if((freshClient.changedPassword(decoded.iat)) == true){
        next(new AppError(`User recently changed the password`,404))
    }

    req.user = freshClient
    next()
}