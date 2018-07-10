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
        contrasenna : req.body.contrasenna ,
        foto : req.body.foto
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

module.exports.agregar_titulo = function(req, res){
    
    userModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'titulos':
                {
                    titulo: req.body.titulo, 
                    institucion: req.body.institucion, 
                    anno: req.body.anno
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el título, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El título se registró con éxito'});
            }
        }
    )
};