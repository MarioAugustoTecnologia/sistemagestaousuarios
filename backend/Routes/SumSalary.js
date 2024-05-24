const express = require('express');
const Router = express.Router();
const db = require('../db/db');


Router.get('/salario_count', (req, res) => {
    db.query('SELECT SUM(SALARIO) AS TOTAL_SALARIOS FROM USUARIOS;', (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    }) 
})

module.exports = Router;