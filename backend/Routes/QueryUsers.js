const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db = require('../db/db');


Router.post('/adminlogin', (req, res) => {    
    const email = req.body.email;
    const senha = req.body.senha;
     
    db.query('SELECT * FROM USUARIOS WHERE EMAIL = ?', [email], (err, result) => {
        if (err){
           return res.json({loginStatus: false, Error: "Query Error"});
        } 
        if(result.length > 0){

                bcrypt.compare(senha, result[0].senha, (err, response) => {

                if (err) { return res.json({loginStatus: false, Error: "Senha Errada!"})}; 

                 if(response){
                    const email = result[0].email;
                    const token = jwt.sign({role: "users", email: email, id: result[0].id}, "jwt_secret_key", {expiresIn: '365d'}              
                  );
                  res.cookie('token', token)
                  return res.json({loginStatus: true, id: result[0].id})
                 }  
                })
          
        
        }else{
            return res.json({loginStatus: false, Error: "Email e/ou senha não confere"});
        }
    })
   })

   Router.get('/admin_list', (req, res) => {
    const sql = 'SELECT USUARIOS.ID, USUARIOS.EMAIL FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID WHERE CATEGORIA.NOME = "Administrador";'; 
    db.query(sql, (err, result) => {
       if(err) return res.json({Status: false, Error: 'Query Error'})
       return res.json({Status:true, Result: result})
    })  
   })

   Router.get('/usuarios', (req, res) => {
    const sql = "SELECT USUARIOS.*, date_format(`DATA_NASCIMENTO`,'%d/%m/%Y') as `nascimento`, CATEGORIA.NOME AS CATEGORIA FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID ORDER BY ID;";
    db.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

Router.get('/usuario/nome', (req, res) => {
    const sql = "SELECT USUARIOS.*, date_format(`DATA_NASCIMENTO`,'%d/%m/%Y') as `nascimento`, CATEGORIA.NOME AS CATEGORIA FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID ORDER BY USUARIOS.NOME";
    db.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

Router.get('/usuario/categoria', (req, res) => {
    const sql = "SELECT USUARIOS.*, date_format(`DATA_NASCIMENTO`,'%d/%m/%Y') as `nascimento`, CATEGORIA.NOME AS CATEGORIA FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID ORDER BY USUARIOS.NOME";
    db.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

Router.get('/usuario/:id', (req, res) => {

    const id = req.params.id;

    const sql = "SELECT USUARIOS.*, CATEGORIA.NOME AS CATEGORIA FROM USUARIOS INNER JOIN CATEGORIA ON USUARIOS.CAT_ID = CATEGORIA.ID WHERE USUARIOS.ID = ?;";    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})  
   

    })
})


Router.get('/detalhe/:id', (req, res) => {

    const id = req.params.id;
    const sql = "SELECT * FROM USUARIOS WHERE ID = ?"; 
 
    db.query(sql, [id], (err, result) => {
     
     if (err) return res.json({Status: false});
     return res.json(result)
 
    })
    
 
 }) 


module.exports = Router;