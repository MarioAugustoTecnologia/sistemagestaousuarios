const express = require('express');
const Router = express.Router();
const db = require('../db/db');



Router.delete('/excluir_usuario/:id', (req, res) => {    
    const id = req.params.id;       

    db.query('DELETE FROM USUARIOS WHERE ID = ?', 
    id, (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    })
    db.query('ALTER TABLE USUARIOS AUTO_INCREMENT = 1');

    
   
})

module.exports = Router;