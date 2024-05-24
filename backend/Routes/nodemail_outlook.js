const { rejects } = require('assert');
const { response } = require('express');
const mailer = require('nodemailer');
const { resolve } = require('path');



module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, 
        auth: {
            user:'mpisanisti@outlook.com',
            pass:'529628@bcist'           

        },
        tls: {
            rejectUnauthorized: false
        }            

    })
    const mail = {
        from: '',
        to: email,
        subject: `${nome} te enviou uma mensagem.`,
        text: mensagem,

    }
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }

    return new Promise((resolve, rejects) => {
        smtpTransport.sendMail(mail)
        .then(response => {
            smtpTransport.close();
            return resolve(response);
        }).catch(error => {
            smtpTransport.close();
            return rejects(error);
        })
    })

    
}


