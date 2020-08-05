const express = require("express")
const messageController = require("./../controllers/messageController")
const authController = require("./../controllers/authController")

const router = express.Router()
router.route("/")
    .post(      
        messageController.createMessage
        )

router.route("/byId/:id")
    .put(        
        messageController.udpateMessage
    )
    .delete(        
        messageController.deleteMessage
    )

router.route("/allseen/")
        .put(
                messageController.allMessagesAreSeen)

router.route("/byWorkspaceId/:id")
        .get(
                messageController.getMessagesByWorskspaceID)

router.route("/unseenMsgs")
        .get(
                messageController.getUnSeenMessages)

router.route("/getUpdatedMsgs")
        .get(
                authController.protect,
                messageController.getUpdatedMessage)

router.route("/getChat/:sendersId/:recieversId")
        .get(
                messageController.getChat)


router.route("/getClientGeneral/:cabinetId")
        .get(
                messageController.getGeneralClientMsg)

 router.route("/getCabinetGeneral/:cabinetId")
        .get(
                messageController.getGeneralCabinetMsg)                
                
module.exports = router