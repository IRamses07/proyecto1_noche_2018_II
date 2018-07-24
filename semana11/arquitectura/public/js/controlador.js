/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/

'use strict';
let listaPersonas = obtenerListaPersonas();
let idPersonaSeleccionada = '';

imprimirListaPersonas();
const botonRegistrar = document.querySelector('#btnRegistrar');

const botonActualizar = document.querySelector('#btnActualizar');

botonActualizar.hidden = true;

botonRegistrar.addEventListener('click' , obtenerDatos);
botonActualizar.addEventListener('click' , obtenerDatosEditar);

const inputNombre = document.querySelector('#txtNombre');
const inputEmail = document.querySelector('#txtEmail');
const inputTelefono = document.querySelector('#txtTelefono');
const inputEdad = document.querySelector('#txtEdad');
const inputContrasenna = document.querySelector('#txtContrasenna');
const inputConfirmacion = document.querySelector('#txtConfirmacion');
const inputFiltro = document.querySelector('#txtFiltro');
const imagen = document.querySelector('#txtImagen');

inputFiltro.addEventListener('keyup' , function(){
    imprimirListaPersonas(inputFiltro.value)
});

function obtenerDatos(){
    
    let bError = false;

    let sNombre = inputNombre.value;    
    let sEmail = inputEmail.value;
    let sTelefono = inputTelefono.value;
    let nEdad = Number(inputEdad.value);
    let sContrasenna = inputContrasenna.value;
    let sConfirmacion = inputConfirmacion.value;

    
    
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
        console.log(imagenUrl);
        registrarPersona(sNombre, sEmail, sTelefono, nEdad, sContrasenna, imagenUrl);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El usuario se registró adecuadamente',
            confirmButtonText : 'Entendido'
        });
        listaPersonas = obtenerListaPersonas();
        imprimirListaPersonas();
        limpiarFormulario();
    }
    
};

function obtenerDatosEditar(){
    
    let bError = false;

    let sNombre = inputNombre.value;    
    let sEmail = inputEmail.value;
    let sTelefono = inputTelefono.value;
    let nEdad = Number(inputEdad.value);
    

    
    
    //bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el usuario',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        });
        console.log('No se pudo registrar el usuario');
    }else{
        console.log(imagenUrl);
        actualizarPersona(idPersonaSeleccionada,sNombre, sEmail, sTelefono, nEdad, imagen.src);
        swal({
            type : 'success',
            title : 'Usuario actualizado',
            text: 'El usuario se actualizó adecuadamente',
            confirmButtonText : 'Entendido'
        });
        listaPersonas = obtenerListaPersonas();
        imprimirListaPersonas();
        limpiarFormulario();
        botonActualizar.hidden = true;
        botonRegistrar.hidden = false;
    }
    
};
function imprimirListaPersonas(pFiltro){
    
    let tbody = document.querySelector('#tblPersonas tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i = 0; i < listaPersonas.length; i++){
        if(listaPersonas[i]['nombre_completo'].toLowerCase().includes(pFiltro.toLowerCase())){
            let fila = tbody.insertRow();
            
            let cFoto = fila.insertCell();
            let cNombre = fila.insertCell();
            let cEmail = fila.insertCell();
            let cTelefono = fila.insertCell();
            let cEdad = fila.insertCell();
            let cConfiguracion = fila.insertCell();
    
            let imagen = document.createElement('img');
            imagen.src = listaPersonas[i]['foto'];
            imagen.classList.add('imageSettings');

    
            cFoto.appendChild(imagen);
           
    
    
            cNombre.innerHTML = listaPersonas[i]['nombre_completo'];
            cEmail.innerHTML = listaPersonas[i]['correo'];
            cTelefono.innerHTML = listaPersonas[i]['telefono'];
            cEdad.innerHTML = listaPersonas[i]['edad'];

            //Íconos para editar
            let aModificar = document.createElement('a');
            aModificar.classList.add('fas');
            aModificar.classList.add('fa-pen');
            aModificar.dataset._id =  listaPersonas[i]['_id'];

            let aBorrar = document.createElement('a');
            aBorrar.classList.add('fas');
            aBorrar.classList.add('fa-trash');
            aBorrar.dataset._id =  listaPersonas[i]['_id'];

            aModificar.addEventListener('click', llenarDatosFormulario);
            aBorrar.addEventListener('click', borrarPersona);

            cConfiguracion.appendChild(aModificar);
            cConfiguracion.appendChild(aBorrar);

        }
        
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
    inputEdad.value = '';
    inputContrasenna.value = '';
    inputConfirmacion.value = '';
    idPersonaSeleccionada = '';
    imagen.src = '';
};

function llenarDatosFormulario(){
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    
    idPersonaSeleccionada =  this.dataset._id;// se obtiene el id del usuario seleccionado
    
    let usuario = obtenerPersonaPorId(idPersonaSeleccionada);

    inputNombre.value =  usuario['nombre_completo'];
    inputEmail.value = usuario['correo'];
    inputTelefono.value = usuario['telefono'];
    inputEdad.value = usuario['edad'];

    imagen.src = usuario['foto'];

};

function borrarPersona(){
    let id = this.dataset._id;
    borrarPersonaPorId(id);
    listaPersonas = obtenerListaPersonas();
    imprimirListaPersonas();

}