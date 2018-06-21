'use strict';
const userModel = require('./users.model');

//Función para registrar un usuario
module.exports.registrar = function(req, res){
    //Crea una variable nuevoUsuario utilizando como plantilla el userModel
    let nuevoUsuario = new userModel({
        nombre_completo : req.body.nombre_completo,
        correo : req.body.correo,
        telefono : req.body.telefono,
        edad : req.body.edad,
        contrasenna : req.body.contrasenna 
    });

    nuevoUsuario.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el usuario, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El usuario se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    userModel.find().then(
        function(usuarios){
            res.send(usuarios);
        });
};