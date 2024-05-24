const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db = require('../db/db');
const multer = require('multer');
const path = require('path');


///upload da imagem
 const storage = multer.diskStorage({
    destination: (req, file, db) => {
       db(null, 'Public/Images')
    },
    filename: (req, file, db) => {
        db(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

//fim do upload da imagem      
       

   Router.post('/cadastrar_usuario', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO USUARIOS (NOME, EMAIL, SENHA, FONE, DATA_NASCIMENTO, CAT_ID, IMAGE, SALARIO) VALUES (?)`;
    bcrypt.hash(req.body.senha, salt, (err, hash) => {
        if (err) return res.json({Status: false, Error: 'Query Error'})

        const values = [
            req.body.nome,
            req.body.email,
            hash,
            req.body.fone,                  
            req.body.data_nascimento,
            req.body.cat_id,
            req.file.filename, 
            req.body.salario                                        
            ] 
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({Status: false, Error: 'Query Error'})
            return res.json({Status: true, Result: result})
        })
    } )
   }) 

   
 
module.exports = Router;