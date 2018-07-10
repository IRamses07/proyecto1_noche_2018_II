'use strict';
const express = require('express');
const router = express.Router();
const users = require('./users.api');


router.route('/registrar_usuario')
    .post(function(req, res){
    users.registrar(req, res);
});

router.route('/agregar_titulo')
.post(function(req, res){
users.agregar_titulo(req, res);
});

router.route('/listar_usuarios')
    .get(function(req, res){
    users.listar(req, res);
});


module.exports = router;