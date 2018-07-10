
let botonRegistrar = document.querySelector('#btnAgregar');
let selectUsuarios = document.querySelector('#sltPersonas');
let inputTitulo = document.querySelector('#txtTitulo');
let inputInstitucion=document.querySelector('#txtInstitucion');
let inputAnno = document.querySelector('#txtAnno');

botonRegistrar.addEventListener('click', obtenerDatos)
listarUsuarios();


function obtenerDatos(){
    let id = selectUsuarios.value;
    let sTitulo = inputTitulo.value;
    let sInstitucion = inputInstitucion.value;
    let sAnno =  inputAnno.value;

    agregarTitulo(id, sTitulo, sInstitucion,sAnno);
}

function listarUsuarios(){
    let usuarios = obtenerListaPersonas();
    for(let i = 0; i < usuarios.length; i++){
        let opcion = new Option(usuarios[i]['nombre_completo'])
        opcion.value = usuarios[i]['_id'];
        
        selectUsuarios.options.add(opcion);
        

    }
}