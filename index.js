var express=  require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var database = require('./src/models/database');

var app=  express();


const  userRoutes = require('./src/routes/user-Routes.js');
const  projectRoutes= require('./src/routes/project_Routers.js')
const  invitationRoutes= require('./src/routes/invitation_Router.js')

app.use(cors());//origenes cruzados
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//routas

app.use('/api', userRoutes, projectRoutes,invitationRoutes);

var usuarios = [{
    nombre: 'Gissela'
}]
app.get("/", function(req, res){
    res.send("Servidor BAckend CODEANDO Levantado ")
});


//prueba
app.post('/usuarios', function(req, res){
    let usuario ={
        nombre: req.body.nombre
    }

    usuarios.push(usuario);
    res.send({mensaje:"Registro guardado", usuarioGuardado: usuario})
})

//obtener usuarios 
app.get('/usuarios', function(req,res){
    res.send(usuarios);
})

app.get('/usuarios/:id', function(req,res){
    res.send(usuarios[req.params.id]);
});

//actualizar usuarios
app.put('/usuarios/a/:id', function(req, res){
    let usuario ={
        nombre: req.body.nombre
    }

    usuarios[req.params.id]=usuario;
    res.send({codigoResultado:1, usuarioActualizado: usuario})
})
 //eliminar un usuario

app.delete('/usuarios/:id', function(req,res){
    usuarios.splice(req.params.id, 1);

    res.send({codigoResultado:1, mensaje: "usuarioEliminado"})
 })

app.listen(5200, function(){
    console.log("Servidor Levantado xd")
})

//actualizar codigo

