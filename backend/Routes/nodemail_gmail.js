const { rejects } = require('assert');
const { response } = require('express');
const mailer = require('nodemailer');
const { resolve } = require('path');



module.exports = (email, assunto, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mariopisanibtu@gmail.com',
            pass: 'usxg gefb upbd jkil'

        }
    })
    const mail = {
        from: '',
        to: email,
        subject: `${assunto}`,
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