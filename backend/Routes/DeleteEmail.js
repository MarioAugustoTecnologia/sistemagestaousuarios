const express = require('express');
const Router = express.Router();
const db = require('../db/db');


Router.delete('/excluir_email/:id', (req, res) => {    
    const id = req.params.id;       

    db.query('DELETE FROM EMAIL WHERE ID = ?', 
    id, (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    })
    db.query('ALTER TABLE EMAIL AUTO_INCREMENT = 1');

   
})

Router.delete('/excluir_todos_emails/:id', (req, res) => {    
    const id = req.params.id;       

    db.query('DELETE FROM EMAIL WHERE ID = ?', 
    id, (err, result) => {
        if (err){
            return res.json({Status: false, Error: 'Query Error'}); 
        } else {
            return res.json({Status: true, Result: result});
        }
    })
    db.query('TRUNCATE TABLE EMAIL');

   
})

module.exports = Router;
