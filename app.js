require("./model/db")
const express = require("express")
const app = express();
const cabinetRouter = require("./routers/cabinet.route")
const attorneyRouter = require("./routers/attorney.route")
const clientRouter = require("./routers/client.route")
const workspaceRouter = require("./routers/workspace.route")
const messageRouter = require("./routers/message.route")
const serviceRouter = require("./routers/services.route")
const AppError = require('./utils/appError')
const GlobalErrorHandler = require('./controllers/errorController')
var cors = require('cors')
const morgan = require("morgan")

//body parser for reading the body
app.use(express.json({limit: '10kb'}));
app.use(cors())
if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}
// Global middlewares
app.use("/api/v1/cabinets",cabinetRouter)
app.use("/api/v1/attorneys",attorneyRouter)
app.use("/api/v1/clients",clientRouter)
app.use("/api/v1/workspaces",workspaceRouter)
app.use("/api/v1/messages",messageRouter)
app.use("/api/v1/services",serviceRouter)

app.all("*",(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))

})
app.use(GlobalErrorHandler)

module.exports = app