const express = require('express');
const Router = express.Router();
const db = require('../db/db');


Router.get('/emails_enviados', (req, res) => {
    const sql = "SELECT EMAIL.*, date_format(`data`,'%d/%m/%Y') as `data` FROM EMAIL";
    db.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

module.exports = Router;