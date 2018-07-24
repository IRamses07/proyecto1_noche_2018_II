function agregarTitulo(id, sTitulo, sInstitucion,sAnno){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/agregar_titulo',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
            titulo : sTitulo,
            institucion : sInstitucion,
            anno : sAnno
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}