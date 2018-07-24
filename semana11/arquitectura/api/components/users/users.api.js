'use strict';
const nodeMailer = require('nodemailer');
const userModel = require('./users.model');

//Poner en si https://myaccount.google.com/lesssecureapps
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proyecto.test.software@gmail.com',
        pass: '1proyectotestsoftware9'
    }
});



//Función para registrar un usuario
module.exports.registrar = function (req, res) {
    //Crea una variable nuevoUsuario utilizando como plantilla el userModel
    let nuevoUsuario = new userModel({
        nombre_completo: req.body.nombre_completo,
        correo: req.body.correo,
        telefono: req.body.telefono,
        edad: req.body.edad,
        contrasenna: req.body.contrasenna,
        foto: req.body.foto
    });

    nuevoUsuario.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            let mailOptions = {
                from: 'proyecto.test.software@gmail.com',
                to: nuevoUsuario.correo,
                subject: 'Bievenido a Cenfo App',
                html: `
                <html>
                <head>
                    <style>
                        .tituloPrincipal{
                            background: #6c5ce7;
                        }
                    </style>
                </head>
                <body>
                    <h1 class='tituloPrincipal'>Bienvenido ${nuevoUsuario.nombre_completo}</h1>
                    <p>Disfrute de nuestra aplicación el correo con el cual debe iniciar sesión es: ${nuevoUsuario.correo}</p>
                    <img src=${nuevoUsuario.foto}> 
                </body>
            </html>
                        `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.json({ success: true, msg: 'El usuario se registró con éxito' });
        }

    });

};

module.exports.listar = function (req, res) {
    userModel.find().then(
        function (usuarios) {
            res.send(usuarios);
        });
};

module.exports.agregar_titulo = function (req, res) {

    userModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'titulos':
                {
                    titulo: req.body.titulo,
                    institucion: req.body.institucion,
                    anno: req.body.anno
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar el título, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'El título se registró con éxito' });
            }
        }
    )
};

module.exports.buscar_usuario_id = function (req, res) {
    userModel.findById({ _id: req.body.id }).then(
        function (usuario) {
            res.send(usuario);
        });
};

module.exports.actualizar = function (req, res) {
    userModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.borrar = function (req, res) {
    userModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el usuario.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El usuario se ha eliminado correctamente.' + res });
            }
        });
};