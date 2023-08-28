const express = require("express");
const router = express.Router();

const{
    createUser,
    login
}= require("../controllers/user_Controller.js");

//rutas para usuarios
router.post('/singin', createUser);
router.post('/login', login);

module.exports =router;