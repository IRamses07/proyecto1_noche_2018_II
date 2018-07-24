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

//agregado
router.route('/buscar_usuario_id')
    .post(function(req,res){
    users.buscar_usuario_id(req, res);
});

router.route('/actualizar_usuario')
    .post(function(req, res){
    users.actualizar(req, res);
});

router.route('/borrar_usuario')
    .post(function(req, res){
    users.borrar(req, res);
});

module.exports = router;