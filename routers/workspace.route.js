const express = require("express")
const workspaceController = require('./../controllers/workspaceController')
const cabinetController = require("./../controllers/cabinetController")

const router = express.Router()
router.route("/")
    .post(
        cabinetController.detectPresencebyId,
        workspaceController.createWorkspace
    )

router.route("/workspaceByClientId/:clientId")
    .get(
        workspaceController.getWorkspaceByClientId
    )
router.route("/workspaceByCabinetId/:cabinetId")
    .get(
        workspaceController.getWorkspaceByCabinetId
    )

router.route("/:WorkspaceId")
    .delete(        
        workspaceController.deleteWorkspace
    )

module.exports = router