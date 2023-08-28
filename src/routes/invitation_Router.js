const express = require("express");
const router = express.Router();

const{
    createInvitation,
    getUserSentInvitations,
    getUserReceivedInvitations,
    deleteInvitation,
    getUserAcceptedInvitations,
    getUserRejectedInvitations,
    acceptInvitation
} = require('../controllers/invitation_Controller.js')


router.post('/invitation', createInvitation);
router.get('/invitation/:usuarioId', getUserSentInvitations);
router.get('/invitation/received/:usuarioId', getUserReceivedInvitations);
router.delete('/invitation/:invitacionId/:emisorId', deleteInvitation);
router.get('/invitation/accepted/:usuarioId', getUserAcceptedInvitations);
router.get('/invitation/rejected/:usuarioId', getUserRejectedInvitations);
router.put('/invitation/accept/:invitacionId', acceptInvitation);
module.exports= router;