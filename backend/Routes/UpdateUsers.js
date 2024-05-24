const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db = require('../db/db');



Router.put('/atualizar_usuario/:id', (req, res) => {  
      
    const id = req.params.id;
    const nome = req.body.nome;
    const email = req.body.email; 
    const hash = bcrypt.hashSync(req.body.senha, salt);   
    const fone = req.body.fone;
    const data_nascimento = req.body.data_nascimento;
    const cat_id = req.body.cat_id;  
    const salario = req.body.salario;  


    db.query('UPDATE USUARIOS SET nome = ?, email = ?, senha = ?, fone = ?, data_nascimento = ?, cat_id = ?, salario = ? where id = ?', 
    [nome, email, hash, fone, data_nascimento, cat_id, salario, id], (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'})
        } else {
            return res.json({Status: true, Result: result});
           
        }
    })
   
})



module.exports = Router;