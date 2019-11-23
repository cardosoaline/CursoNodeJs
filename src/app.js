const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const app = express()

//para conectar no servidor do mongo Atlas online
mongoose.connect("mongodb+srv://admin:admin@cluster0-puvxh.mongodb.net/cliente",{userNewUrlParser: true});

//para conectar no servidor local
//mongoose.connect("mongodb://localhost:27017/reprograma",
//{userNewUrlParser: true});

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function(){
  console.log("Conexão feita com sucesso.");
})

//rotas
const clientes = require('../src/routes/clientesRoute')
//app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(bodyParser.json());

app.use("/clientes", clientes)

module.exports = app