let grupoSchema = new mongoose.Schema({
    codigo : {type : String, required : true},
    laboratorio : {type : String, required : true},
    curso: {type : String, required : true},
    horario : [
        {
            dia:{type: String},
            hora_inicio: {type: String},
            hora_fin: {type: String}
        }
    ]
});