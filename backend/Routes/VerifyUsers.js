const jwt = require('jsonwebtoken');
const express = require('express')
const Router = express.Router();


const VerifyUsers = (req, res, next) => {
    const token = req.cookies.token;
    
    if(token){
    jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
        if(err) return res.json({Status: false, Error: 'Token errado !'})
        
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    
    })
    }else{
        return res.json({Status: false, Error: 'Não autenticado'})
    }
    }
    
    Router.get('/verify', VerifyUsers, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id})
    } )

    module.exports = Router;