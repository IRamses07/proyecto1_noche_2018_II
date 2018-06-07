/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';
let listaPersonas = [];

function registrarPersona(paInfoPersona){
    listaPersonas.push(paInfoPersona);
}
function obtenerListaPersonas(){
    return listaPersonas;
}