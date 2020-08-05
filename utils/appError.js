class AppError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail':'error'
        this.isOperational = true
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = AppError

// const globalResponseController = ""
// class AppResponse{
//     constructor(message,statusCode){
//         this.statusCode = statusCode
//         this.status = `${statusCode}`.startsWith('2') ? 'success':'error'
//        globalResponseController
//     }
// }

// module.exports = AppRespons