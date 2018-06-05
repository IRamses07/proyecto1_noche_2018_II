/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/


let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click' , obtenerDatos);

function obtenerDatos(){
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

    console.log(sNombre, sEmail, sTelefono, nEdad, sContrasenna, sConfirmacion);

};