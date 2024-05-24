const express = require('express');
const Router = express.Router();
const db = require('../db/db');


Router.get('/salariodes_count', (req, res) => {
    db.query('SELECT SUM(SALARIO) AS TOTAL_SDES FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID WHERE CATEGORIA.NOME = "Desenvolvedor";', (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    }) 
})


module.exports = Router;