const db = require('mysql2')
const dotenv = require('dotenv').config()

const conn = db.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE

})

conn.connect(function(err){
    if(err){
        console.log('Erro ao conectar ao banco')
    }else{
        console.log('Conexão Mysql ok')
    }
})

module.exports = conn;