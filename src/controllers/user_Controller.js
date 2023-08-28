const  Usuario =  require('../models/user.js');

//funcion creau un usuario singIN

const createUser = async(req, res)=> {
    const user = new Usuario(req.body);
    try{
        await user.save();
        res.status(200).json({codigoResultado: 1, mensage:"creacion de usuario exitosa",  usuarioguardado: user })
    }catch (error){
        res.status(500).json({codigoResultado: 0, mensage:"error en creacion de usuario"})
    }
}
//endpoint inicio de session login
const login = async (req, res) => {
    const { email, contrasena } = req.body;
    console.log(email, contrasena)

    try {
        // Buscar el usuario por el correo electrónico
        const usuarioEncontrado = await Usuario.findOne({ email });

        if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasena) {
            return res.status(401).json({ codigoResultado: 0, mensaje: 'Credenciales inválidas' });
        }

        // Eliminar información sensible antes de enviar la respuesta
        const usuarioInfo = {
            _id: usuarioEncontrado._id,
            email: usuarioEncontrado.email,
            imagen: usuarioEncontrado.imagen,
            nombre: usuarioEncontrado.nombre,
            // ... otros campos que quieras incluir ...
        };

        res.json({ codigoResultado: 1, mensaje: 'Inicio de sesión exitoso', usuario: usuarioInfo });
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ codigoResultado: -1, mensaje: 'Error en el servidor' });
    }
};

module.exports ={
    createUser,
    login
};