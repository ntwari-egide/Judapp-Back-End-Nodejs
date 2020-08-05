const express = require("express")
const authController = require('./../controllers/authController')
const clientController = require('./../controllers/cleintController')

const router = express.Router()
router.route("/signup")
    .post(authController.signupClient)

router.route("/login")
    .post(authController.loginClient)

router.route("/getClientByPhone")
    .post(clientController.getClientByPhonenumber)

    
module.exports = router