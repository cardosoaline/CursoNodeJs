
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

//Routes
const clientesRouter = require("./routes/clientesRoute")


//Conexão com DB.Mongo cria sozinho o DB.
mongoose.connect("mongodb://localhost:27017/reprograma",{useNewUrlParser:true});
//Sem precisar criar na mão o banco.



//Banco de Dados.
let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function(){
    console.log("Conexão feita com sucesso.")
})


//permite que qualquer um acesse a api/pesquisar!
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") //permite que qualquer um acesse a api/pesquisar!
    res.header(
      "Access-Control-Allow-Headers", // permite que seja retornado a requisição.
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

  
//isso evita a repetição do codigo na url.
  app.use(bodyParser.json()); 
  app.use("/clientes",clientesRouter) //isso evita a repetição do codigo na url.

   module.exports = app