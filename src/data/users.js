// const mongoose = require('mongoose');
// const User = require('../models/user.js');
// const Project = require('../models/project.js');

// // insertar usuarios
// async function insertUsers() {
//   try {
//     const userCount = await User.countDocuments(); 

//     if (userCount === 0) {
//       const usersData = [
//         {
//           nombre: 'Usuario 1',
//           email: 'usuario1@example.com',
//           contrasena: 'contraseña1',
//           imagen: 'https://www.pinterest.es/pin/1129136937808385714/',
//           edad: '25',
//           proyectos: [],
//           invitaciones: []
//         },
//         {
//           nombre: 'Josseline',
//           email: 'usuario2@example.com',
//           contrasena: 'contraseña2',
//           imagen: 'https://i.pinimg.com/564x/ce/e9/33/cee933c32994601f1d63cd331bc2e55a.jpg',
//           edad: '22',
//           proyectos: [],
//           invitaciones: []
//         },
//         {
//           nombre: 'Andy',
//           email: 'usuario3@example.com',
//           contrasena: 'contraseña3',
//           imagen: 'https://i.pinimg.com/564x/83/c6/35/83c635defce8558de60e0f1949a81925.jpg',
//           edad: '23',
//           proyectos: [],
//           invitaciones: []
//         },
//       ];

//       await User.insertMany(usersData);
//       console.log('Usuarios insertados');
//     } else {
//       console.log('La base de datos ya contiene datos, no se agregaron nuevos usuarios.');
//     }
//   } catch (error) {
//     console.error('Error al verificar/insertar usuarios:', error);
//   }
// }


// insertUsers()

// async function inserproject() {
//   try {
//     const projectCount = await Project.countDocuments(); 

//     if (projectCount === 0) {
//       const projectData = [
//         {
//           usuarioId: '64e7d63360183cc94ac24598',
//           nombre: 'Proyecto 1',
//           descripcion: 'projecto de prueba',
//           fechaCreacion: '12/10/2023',
//           codigo: [
//               {
//                   html: "hola mundo",
//                   css: "css hol amundo",
//                   jscript: "hola javascript"
//               }
//           ],
//           miembros: [],
//           privacidad: "privado"
          
//         }
//       ];

//       await Project.insertMany(projectData);
//       console.log('Proyectos insertados');
//     } else {
//       console.log('La base de datos ya contiene datos, no se agregaron nuevos proyectos.');
//     }
//   } catch (error) {
//     console.error('Error al verificar/insertar proyectos:', error);
//   }
// }


// inserproject()