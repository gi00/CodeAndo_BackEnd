const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    usuarioId: {type: mongoose.Schema.Types.ObjectId, required: true },
    nombre: { type: String,  required: true},
    descripcion: {type:String},
    fechaCreacion: {type: Date, default: Date.now },
    codigo: 
        {
            html: {type:String},
            css: {type:String},
            jscript: {type:String}

        },
    miembros: [
        {
             usuarioId: {type: String},
             nombre: {type: String},
        }
    ],
    privacidad: {type: String, enum: ['privado', 'publico'], default: 'privado'}
});

const Project = mongoose.model('project', projectSchema);

module.exports =  Project;