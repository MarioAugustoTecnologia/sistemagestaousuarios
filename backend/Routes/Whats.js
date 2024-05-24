const express = require('express');
const Router = express.Router();
const wbm = require("../wbm");



   

Router.post("/whats", (req, res) => {
 
  const {phone, msg} = req.body;
  const archive = req.files 

    wbm
      .start({ qrCodeData: true, session: false, showBrowser: false })
      .then(async (qrCodeData) => {
        console.log(qrCodeData); // show data used to generate QR Code
        res.send(qrCodeData);
        await wbm.waitQRCode();
  
        const phones = [phone];   
        const message = [msg];
        const file = archive;  

       
        await wbm.send(phones, message, file);
        await wbm.end();
      })
      .catch((err) => {
        console.log(err);
      });
  })


module.exports = Router;  