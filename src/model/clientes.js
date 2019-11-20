const mongoose = require('mongoose')

//INSTANCIANDO UM NOVO SCHEMA(MODELO) caracteristicas q o objeto vai possuir
const ClientesSchema = new mongoose.Schema({
    nome: { type: String},
    email:{ type: String, require:true},
    cpf:{ type: Number},
    dataNascimento:{ type: Date},
    estadoCivil:{ type: String},
    telefone:{ type: Number},
    Comprou:{ type: Boolean}
},{

    versionKey: false //Ignora a informação no banco ou seja não mostra!

})

const Clientes = mongoose.model('Clientes',ClientesSchema);


module.exports = Clientes;