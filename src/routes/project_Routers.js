const express = require("express");
const router = express.Router();

const{
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
}= require("../controllers/project_Controller.js");


//rutas
router.post('/proyecto', createProject);
router.put('/proyecto/:_id/codigo', actualizarProjectCode);
router.get('/proyecto/:_id/codigo', getProjectCode);
router.get('/proyectos/:usuarioId', getUserProjects);
router.get('/user/:usuarioId/:proyectoId', getUserProject);
router.delete('/user/:usuarioId/:proyectoId', deleteProject);

router.put('/proyecto/:_id/publico', makeProjectPublic);
router.put('/proyecto/:_id/privado', makeProjectPrivate);
router.get('/proyectos/:usuarioId/privados', getUserPrivateProjects);
router.get('/proyectos/:usuarioId/publicos', getUserPublicProjects);

router.delete('/proyecto/:_id/:usuarioId', deleteProjectMember);
router.get('/proyectos/:_id/miembros', getProjectMembers);

module.exports= router;