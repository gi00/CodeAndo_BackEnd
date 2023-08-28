     
const  Project =  require('../models/project');

const createProject = async (req, res) => {
    const { usuarioId, nombre } = req.body;
    
    try {
        // Verificar si el usuario ya tiene un proyecto con el mismo nombre
        const existingProject = await Project.findOne({ usuarioId, nombre });
        console.log(existingProject)
        if (existingProject) {
            return res.status(400).json({
                codigoResultado: 0,
                mensaje: "El usuario ya tiene un proyecto con ese nombre"
            });
        }

        const project = new Project(req.body);
        console.log("Guardar", project)
        await project.save();
        res.status(200).json({
            codigoResultado: 1,
            mensaje: "Creación de proyecto exitosa",
            proyectoGuardado: project
        });
    } catch (error) {
        res.status(500).json({
            codigoResultado: 0,
            mensaje: "Error en creación de proyecto"
        });
    }
};

//actualizar project
const actualizarProjectCode = async (req, res) => {
    const { _id } = req.params;
    const { html, css, jscript } = req.body;
  console.log(_id, html,css,jscript)
    try {
        const project = await Project.findByIdAndUpdate(_id, {
            'codigo.html': html,
            'codigo.css': css,
            'codigo.jscript': jscript
        }, { new: true });

        if (!project) {
            return res.status(404).json({codigoResultado: 0,mensaje: "Proyecto no encontrado"});
        }

        res.status(200).json({codigoResultado: 1, mensaje: "Código de proyecto actualizado",proyectoActualizado: project.codigo});
    } catch (error) {
        res.status(500).json({codigoResultado: 0, mensaje: "Error al actualizar el código del proyecto"});
    }
};

//obtener solo el codigo de un  proyecto
const getProjectCode = async (req, res) => {
    const { _id } = req.params;

    try {
        const project = await Project.findById(_id);

        if (!project) {
            return res.status(404).json({
                codigoResultado: 0,
                mensaje: "Proyecto no encontrado"
            });
        }

        const codigo = project.codigo;
        res.status(200).json({
            codigoResultado: 1,
            mensaje: "Código de proyecto obtenido",
            codigo
        });
    } catch (error) {
        res.status(500).json({
            codigoResultado: 0,
            mensaje: "Error al obtener el código del proyecto"
        });
    }
};

//traer todos los proyectos de un usuario
const getUserProjects = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const projects = await Project.find({ usuarioId});

        res.status(200).json({
            codigoResultado: 1,
            mensaje: "Proyectos obtenidos",
            proyectos: projects
        });
    } catch (error) {
        res.status(500).json({
            codigoResultado: 0,
            mensaje: "Error al obtener los proyectos del usuario"
        });
    }
};

//obtener un proyecto de un usuario
const getUserProject = async (req, res) => {
    const { usuarioId, proyectoId } = req.params;
    console.log(usuarioId, proyectoId )

    try {
        const project = await Project.findOne({ _id: proyectoId, usuarioId });

        if (!project) {
            return res.status(404).json({
                codigoResultado: 0,
                mensaje: "Proyecto no encontrado"
            });
        }

        res.status(200).json({
            codigoResultado: 1,
            mensaje: "Proyecto obtenido",
            proyecto: project
        });
    } catch (error) {
        res.status(500).json({
            codigoResultado: 0,
            mensaje: "Error al obtener el proyecto del usuario"
        });
    }
};
 //eliminar un proyecto de un usuario
 const deleteProject = async (req, res) => {
    const { usuarioId, proyectoId } = req.params;

    try {
        const project = await Project.findOneAndDelete({ _id: proyectoId, usuarioId });

        if (!project) {
            return res.status(404).json({
                codigoResultado: 0,
                mensaje: "Proyecto no encontrado"
            });
        }

        res.status(200).json({
            codigoResultado: 1,
            mensaje: "Proyecto eliminado"
        });
    } catch (error) {
        res.status(500).json({
            codigoResultado: 0,
            mensaje: "Error al eliminar el proyecto"
        });
    }
};
//cambiar un proyecto de privado a publico 
const makeProjectPublic = async (req, res) => {
    const { _id } = req.params;
    console.log(_id)

    try {
        const updatedProject = await Project.findByIdAndUpdate( _id, { privacidad: 'publico' }, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ codigoResultado: 0, mensaje: "Proyecto no encontrado" });
        }

        res.status(200).json({ codigoResultado: 1, mensaje: "Privacidad del proyecto actualizada a público", proyectoActualizado: updatedProject });
    } catch (error) {
        res.status(500).json({ codigoResultado: 0, mensaje: "Error al actualizar la privacidad del proyecto" });
    }
};

//cambiar un proyecto de privado a publico 
const makeProjectPrivate = async (req, res) => {
    const { _id } = req.params;

    try {
        const updatedProject = await Project.findByIdAndUpdate( _id, { privacidad: 'privado' }, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ codigoResultado: 0, mensaje: "Proyecto no encontrado" });
        }

        res.status(200).json({ codigoResultado: 1, mensaje: "Privacidad del proyecto actualizada a privado", proyectoActualizado: updatedProject });
    } catch (error) {
        res.status(500).json({ codigoResultado: 0, mensaje: "Error al actualizar la privacidad del proyecto" });
    }
};

//traer todos los proyectos privados de un usuario
const getUserPrivateProjects = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const privateProjects = await Project.find({ usuarioId, privacidad: 'privado' });

        res.status(200).json({ codigoResultado: 1, mensaje: "Proyectos privados obtenidos", proyectos: privateProjects });
    } catch (error) {
        res.status(500).json({ codigoResultado: 0, mensaje: "Error al obtener los proyectos privados del usuario" });
    }
};

//traer todos los proyectos publicos de un usuario
const getUserPublicProjects = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const publicProjects = await Project.find({ usuarioId, privacidad: 'publico' });

        res.status(200).json({ codigoResultado: 1, mensaje: "Proyectos públicos obtenidos", proyectos: publicProjects });
    } catch (error) {
        res.status(500).json({ codigoResultado: 0, mensaje: "Error al obtener los proyectos públicos del usuario" });
    }
};

///e;iminar un miembro  de un proyecto
const deleteProjectMember = async (req, res) => {
    const { _id, usuarioId } = req.params;
console.log (_id, usuarioId)
    try {
        const project = await Project.findByIdAndUpdate(_id, {
            $pull: { miembros: { usuarioId } }
        }, { new: true });

        if (!project) {
            return res.status(404).json({ codigoResultado: 0, mensaje: "Proyecto no encontrado" });
        }

        res.status(200).json({ codigoResultado: 1, mensaje: "Miembro eliminado del proyecto", proyectoActualizado: project });
    } catch (error) {
        res.status(500).json({ codigoResultado: 0, mensaje: "Error al eliminar el miembro del proyecto" });
    }
};


const getProjectMembers = async (req, res) => {
    const { _id} = req.params;

    try {
        const project = await Project.findById(_id);

        if (!project) {
            return res.status(404).json({ codigoResultado: 0, mensaje: "Proyecto no encontrado" });
        }

        res.status(200).json({ codigoResultado: 1, mensaje: "Miembros del proyecto obtenidos", miembros: project.miembros });
    } catch (error) {
        res.status(500).json({ codigoResultado: 0, mensaje: "Error al obtener los miembros del proyecto" });
    }
};


module.exports ={
    createProject,
    actualizarProjectCode,
    getProjectCode,
    getUserProjects,
    getUserProject,
    deleteProject,

    makeProjectPublic,
    makeProjectPrivate,
    getUserPrivateProjects,
    getUserPublicProjects,

    deleteProjectMember,
    getProjectMembers
};
