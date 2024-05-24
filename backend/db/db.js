const db = require('mysql2')

const conn = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'system2024',
  database: 'basico' 
})

conn.connect(function(err){
    if(err){
        console.log('Erro ao conectar ao banco')
    }else{
        console.log('Conexão Mysql ok')
    }
})

module.exports = conn;