/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/

'use strict';
imprimirListaPersonas();
let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click' , obtenerDatos);

let inputNombre = document.querySelector('#txtNombre');
let inputEmail = document.querySelector('#txtEmail');
let inputTelefono = document.querySelector('#txtTelefono');
let inputEdad = document.querySelector('#txtEdad');
let inputContrasenna = document.querySelector('#txtContrasenna');
let inputConfirmacion = document.querySelector('#txtConfirmacion');

function obtenerDatos(){
    let infoPersona =[];
    let bError = false;

    let sNombre = inputNombre.value;    
    let sEmail = inputEmail.value;
    let sTelefono = inputTelefono.value;
    let nEdad = Number(inputEdad.value);
    let sContrasenna = inputContrasenna.value;
    let sConfirmacion = inputConfirmacion.value;

    infoPersona.push(sNombre, sEmail, sTelefono, nEdad, sContrasenna);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el usuario',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        });
        console.log('No se pudo registrar el usuario');
    }else{
        registrarPersona(infoPersona);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El usuario se registró adecuadamente',
            confirmButtonText : 'Entendido'
        });
        imprimirListaPersonas();
        limpiarFormulario();
    }
    
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

        cNombre.innerHTML = listaPersonas[i]['nombre_completo'];
        cEmail.innerHTML = listaPersonas[i]['correo'];
        cTelefono.innerHTML = listaPersonas[i]['telefono'];
        cEdad.innerHTML = listaPersonas[i]['edad'];
    }

};

function validar(){
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,3}$/;

    //Validación del nombre completo
    if(inputNombre.value == '' || (regexSoloLetras.test(inputNombre.value)==false) ){
        inputNombre.classList.add('error_input');
        bError = true;
    }else{
        inputNombre.classList.remove('error_input');
    }
    //Validación del correo
    if(inputEmail.value == ''){
        inputEmail.classList.add('error_input');
        bError = true;
    }else{
        inputEmail.classList.remove('error_input');
    }
    //Validación del teléfono
    if(inputTelefono.value == ''){
        inputTelefono.classList.add('error_input');
        bError = true;
    }else{
        inputTelefono.classList.remove('error_input');
    }
    //Validación de la edad
    if(inputEdad.value == '' || (regexSoloNumeros.test(inputEdad.value) == false) || Number(inputEdad.value) < Number(inputEdad.min)  || Number(inputEdad.value) > Number(inputEdad.max)){
        inputEdad.classList.add('error_input');
        bError = true;
    }else{
        inputEdad.classList.remove('error_input');
    }

    //Validación de la contraseña

    if(inputContrasenna.value == ''){
        inputContrasenna.classList.add('error_input');
        bError = true;
    }else{
        inputContrasenna.classList.remove('error_input');
    }

    if(inputContrasenna.value != inputConfirmacion.value){
        inputContrasenna.classList.add('error_input');
        inputConfirmacion.classList.add('error_input');
        bError = true;
    }else{
        inputContrasenna.classList.remove('error_input');
        inputConfirmacion.classList.remove('error_input');
    }

    return bError;
};

function limpiarFormulario(){
    inputNombre.value = '';    
    inputEmail.value = '';
    inputTelefono.value ='';
    inputEdad.value = 0;
    inputContrasenna.value = '';
    inputConfirmacion.value = '';
}