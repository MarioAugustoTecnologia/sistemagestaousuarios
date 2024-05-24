const express = require('express');
const Router = express.Router();
const upload = require("multer")();

Router.post('/send_gmail', upload.single('anexo'), (req, res, next) => { 
    const assunto = req.body.assunto;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;
    
    require("./nodemail_gmail")(email, assunto, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})


module.exports = Router;