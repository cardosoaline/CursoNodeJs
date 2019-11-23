
const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String},
    cpf: {type: Number},
    dataNascimento: {type: String},
    estadoCivil: {type: String},
    telefone: {type: Number},
    comprou:{type: Boolean}
}, 
{
        versionKey: false
})

const Clientes = mongoose.model('Cliente', clienteSchema);

module.exports = Clientes;