const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    proyectoId: {type: mongoose.Schema.Types.ObjectId, required: true },
    emisor: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        nombre: { type: String },
        correo: { type: String}
    },
    receptor: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        nombre: { type: String},
        correo: { type: String }
    },
    fecha: { type: Date, default: Date.now },
    estatus: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
