const Invitation = require('../models/invitation'); 
const  Project =  require('../models/project.js');
const User = require('../models/user.js');

const createInvitation = async (req, res) => {
    const { proyectoId,  emisorId, receptorCorreo } = req.body;

    try {
        // Buscar al emisor por su ID
        const emisor = await User.findById({_id: emisorId});

        if (!emisor) {
            return res.status(404).json({ mensaje: "Emisor no encontrado" });
        }

        // Buscar al receptor por su correo
        const receptor = await User.findOne({ email: receptorCorreo });

        if (!receptor) {
            return res.status(404).json({ mensaje: "Receptor no encontrado" });
        }

        const invitation = new Invitation({
            proyectoId,
            emisor: {
                id: emisor._id,
                nombre: emisor.nombre,
                correo: emisor.email
            },
            receptor: {
                id: receptor._id,
                nombre: receptor.nombre,
                correo: receptor.email
            }
        });

        await invitation.save();

        res.status(201).json({ mensaje: "Invitación creada exitosamente", invitacion: invitation });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la invitación", error: error.message });
    }
};


// Obtener todas las solicitudes enviadas por un usuario
const getUserSentInvitations = async (req, res) => {
    const { usuarioId } = req.params;
    console.log(usuarioId)
    try {
        const invitations = await Invitation.find({ 'emisor.id': usuarioId });
        console.log(invitations)
        res.status(200).json({ invitacionesEnviadas: invitations });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las invitaciones enviadas", error: error.message });
    }
};

// Obtener todas las solicitudes recibidas por un usuario
const getUserReceivedInvitations = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const invitations = await Invitation.find({ 'receptor.id': usuarioId });
        res.status(200).json({ invitacionesRecibidas: invitations });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las invitaciones recibidas", error: error.message });
    }
};


// Eliminar una solicitud de invitación
const deleteInvitation = async (req, res) => {
    const { invitacionId, emisorId } = req.params;

    try {
        const invitation = await Invitation.findById({_id: invitacionId});

        if (!invitation) {
            return res.status(404).json({ mensaje: "Invitación no encontrada" });
        }

        // Verificar que el emisor de la solicitud sea el mismo que envió la invitación
        if (invitation.emisor.id.toString() !== emisorId) {
            return res.status(403).json({ mensaje: "No tienes permiso para eliminar esta invitación" });
        }

        const deletedInvitation = await Invitation.findByIdAndDelete(invitacionId);
        res.status(200).json({ mensaje: "Invitación eliminada exitosamente", invitacionEliminada: deletedInvitation });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la invitación", error: error.message });
    }
};

// Obtener todas las solicitudes enviadas en estado aceptado
const getUserAcceptedInvitations = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const invitations = await Invitation.find({ 'emisor.id': usuarioId, estatus: 'aceptada' });
        res.status(200).json({ invitacionesAceptadas: invitations });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las invitaciones aceptadas", error: error.message });
    }
};

// Obtener todas las solicitudes enviadas en estado rechazado
const getUserRejectedInvitations = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const invitations = await Invitation.find({ 'emisor.id': usuarioId, estatus: 'rechazada' });
        res.status(200).json({ invitacionesRechazadas: invitations });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las invitaciones rechazadas", error: error.message });
    }
};







// Aceptar una solicitud de invitación
const acceptInvitation = async (req, res) => {
    const { invitacionId } = req.params;

    try {
        const invitation = await Invitation.findByIdAndUpdate({_id: invitacionId}, { estatus: 'aceptada' }, { new: true });

        if (!invitation) {
            return res.status(404).json({ mensaje: "Invitación no encontrada" });
        }

        // Agregar el miembro a la lista de miembros del proyecto
        const project = await Project.findByIdAndUpdate(invitation.proyectoId, {
            $push: { miembros: { usuarioId: invitation.receptor.id, nombre: invitation.receptor.nombre } }
        }, { new: true });

        res.status(200).json({ mensaje: "Invitación aceptada exitosamente", invitacionAceptada: invitation, proyectoActualizado: project });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al aceptar la invitación", error: error.message });
    }
};

module.exports = {
    createInvitation,
    getUserSentInvitations,
    getUserReceivedInvitations,
    deleteInvitation,
    getUserAcceptedInvitations,
    getUserRejectedInvitations,
    acceptInvitation
};