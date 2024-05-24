const express = require('express');
const Router = express.Router();
const db = require('../db/db');

Router.post('/add_categoria', (req, res) => {
    const sql = `INSERT INTO CATEGORIA (NOME) VALUES (?)`;
     const nome = req.body.nome;  
 
        db.query(sql, [nome], (err, result) => {
            if (err) return res.json({Status: false, Error: 'Query Error'})
            return res.json({Status: true, Result: result})
        })

   })

module.exports = Router;
