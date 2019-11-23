const Clientes = require('../model/clientes');

//Post - adicionar novo cliente
exports.post = (req, res) => {
  let clientes = new Clientes(req.body);

  clientes.save(function (err) {
    if (err) res.status(500).send(err);
    else {
      res.status(201).send({
        status: true,
        mensagem: "Cliente incluído com sucesso!"
      });
    }
  })
}

//Get - ver clientes (todos)
exports.get = (req, res) => {
  Clientes.find(function (err, clientes) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(clientes);
  })
}

exports.getCompradores = (req, res) => {
  Clientes.find({comprou: true}, function (err,clientes){
    if (err) res.status(500).send(err);
    
    const clientesRetorno = clientes.map(cliente => {
      return {
        nome: cliente.nome,
        email: cliente.email 
      }
    })
    res.status(200).send(clientesRetorno)
  })
}

exports.getCpf = (req, res) => {
  const cpf =  req.params.cpf;
  Clientes.find({ cpf }, function (err, cliente){
    if (err) res.status(500).send(err);
    res.status(200).send(cliente);
  })
}

exports.updateCliente = (req, res) => {

  if (!validaFormulario(req.body)) return res.status(400).send({ mensagem: "campos inválidos" });

  Clientes.update(
      { cpf: req.params.cpf },
      { $set: req.body },
      { upsert: true },
      function (err) {
          if (err) return res.status(500).send(err);
          res.status(200).send({ mensagem: "Atualizado com sucesso!" });
      })
}

const validaFormulario = (campos) => {

  const schema = {
      nome: Joi.string().min(1).required(),
      email: Joi.string().min(1).required(),
  }

  const validation = Joi.validate(campos, schema);

  if (validation.error) {
      return false;
  }
  return true;
}

exports.deleteCliente = (req, res) => {
  const cpf = req.params.cpf;

  Clientes.findOne({ cpf }, function(err, cliente){
    if (err) return res.status(500).send(err); //esse método encontra pela variável pedida 
  /*Clientes.findById(idCliente, function(err, cliente){
    if (err) return res.status(500).send(err);     /esse método encontra por id*/

    if (!cliente){
      return res.status(200).send({ message: "Infelizmente esse cliente não foi encontrado!!!"});
    
    cliente.remove(function(err){
      if(!err) {
        res.status(200).send({ message: "Cliente removido com sucesso!!!"});
      }
    })
    }
  })
}


