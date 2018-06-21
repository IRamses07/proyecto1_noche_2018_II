'use strict';
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    nombre_completo : {type : String, required : true},
    correo : {type : String, required: true},
    telefono : {type : String, required : true},
    edad : {type : Number, required : true},
    contrasenna : {type : String, required : true}
});

module.exports = mongoose.model('User', userSchema);