const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Servidor ok!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})