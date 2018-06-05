/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/

'use strict';
let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click' , obtenerDatos);

function obtenerDatos(){
    let infoPersona =[];

    let inputNombre = document.querySelector('#txtNombre');
    let sNombre = inputNombre.value;

    let inputEmail = document.querySelector('#txtEmail');
    let sEmail = inputEmail.value;

    let inputTelefono = document.querySelector('#txtTelefono');
    let sTelefono = inputTelefono.value;

    let inputEdad = document.querySelector('#txtEdad');
    let nEdad = Number(inputEdad.value);

    let inputContrasenna = document.querySelector('#txtContrasenna');
    let sContrasenna = inputContrasenna.value;

    let inputConfirmacion = document.querySelector('#txtConfirmacion');
    let sConfirmacion = inputConfirmacion.value;

    infoPersona.push(sNombre, sEmail, sTelefono, nEdad, sContrasenna);
    
    registrarPersona(infoPersona);
    imprimirListaPersonas();
};
function imprimirListaPersonas(){
    let listaPersonas = obtenerListaPersonas();
    let tbody = document.querySelector('#tblPersonas tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaPersonas.length; i++){
        let fila = tbody.insertRow();

        let cNombre = fila.insertCell();
        let cEmail = fila.insertCell();
        let cTelefono = fila.insertCell();
        let cEdad = fila.insertCell();

        cNombre.innerHTML = listaPersonas[i][0];
        cEmail.innerHTML = listaPersonas[i][1];
        cTelefono.innerHTML = listaPersonas[i][2];
        cEdad.innerHTML = listaPersonas[i][3];
    }

};