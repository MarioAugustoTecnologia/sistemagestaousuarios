const express = require('express');
const Router = express.Router();
const db = require('../db/db');
   
       
Router.post('/cadastrar_envio', (req, res) => {

    const sql = `INSERT INTO EMAIL (EMAIL, DESTINATARIO, ASSUNTO, REMETENTE, SERVICO, DATA, HORA) VALUES (?, curdate(), curtime())`;

    const campos = [
        req.body.email,
        req.body.destinatario,
        req.body.assunto,
        req.body.remetente,
        req.body.servico                                                         
        ]    

        db.query(sql, [campos], (err, result) => {
            if (err) return res.json({Status: false, Error: 'Query Error'})
            return res.json({Status: true, Result: result})
        })

   })         

 
module.exports = Router;