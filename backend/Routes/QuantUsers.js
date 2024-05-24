const db = require('../db/db');
const express = require('express');
const Router = express.Router();



Router.get('/user_count', (req, res) => {
    db.query('SELECT COUNT(ID) AS TOTAL_USUARIOS FROM USUARIOS;', (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    }) 
    
})

module.exports = Router;