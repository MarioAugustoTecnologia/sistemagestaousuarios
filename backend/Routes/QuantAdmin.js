const db = require('../db/db');
const express = require('express');
const Router = express.Router();



Router.get('/admin_count', (req, res) => {
    db.query('SELECT COUNT(CAT_ID) AS ADMIN_TOTAL FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID WHERE CATEGORIA.NOME = "Administrador";', (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    })   
})

module.exports = Router;