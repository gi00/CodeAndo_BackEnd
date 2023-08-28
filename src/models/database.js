const mongoose = require('mongoose');

let bd = 'codeando';
let port = '27017';
let host = '127.0.0.1';

class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect(`mongodb://${host}:${port}/${bd}`)
        .then(result=>{
            console.log('se conecto a la base de datos de mongoose')
        })
        .catch(error=>console.log(error));
    }
}

module.exports = new Database();