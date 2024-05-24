const express = require('express');
const Router = express.Router();



Router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
   })



module.exports = Router;