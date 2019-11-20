const cliente = require('../model/clientes')
const fs = require('fs');


//Metodo post
exports.postCliente = (req, res) => {
    let cliente = new Clientes(req.body);//modela informações e joga no pacote.   
   cliente.save(function(err){
    if (err) res.status(500).send(err);
    else {
        res.status(201).send({
            status: true,
            mensagem: "Aluna incluida com sucesso."
        });
    }
})
}

exports.getCliente = (req, res) => {
    cliente.find(function(err, cliente){
        res.send(cliente)
        if(err) res.status(500).send(err);

        res.status(200).send(cliente)
            
        })
    }

    exports.getCompradores = (req, res) => {
        cliente.find({comprou: true},function(err, cliente){            
            if(err) res.status(500).send(err);
            const clienteRetorno = cliente.map(cliente => {
                return {
                    nome: cliente.nome,
                    email: cliente.email
                }
            })
            res.status(200).send(cliente)                
            })

    }

    exports.getCliente = (req, res) => {
        cliente.find({comprou: true},function(err, cliente){            
            if(err) res.status(500).send(err);
            const clienteRetorno = cliente.map(cliente => {
                return {
                    nome: cliente.nome,
                    email: cliente.email
                }
            })
            res.status(200).send(cliente)                
            })

    }





