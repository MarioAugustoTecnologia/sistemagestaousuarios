const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');
const QuantAdmin = require('./Routes/QuantAdmin');
const QuantDes = require('./Routes/QuantDes')
const QuantUsers = require('./Routes/QuantUsers');
const SumSalary = require('./Routes/SumSalary');
const SumSalaryAdm = require('./Routes/SumSalaryAdm');
const SumSalaryDes = require('./Routes/SumSalaryDes');
const Logout = require('./Routes/Logout');
const verifyRouter = require('./Routes/VerifyUsers');
const QueryUsers = require('./Routes/QueryUsers');
const QueryCategory = require('./Routes/QueryCategory')
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Servidor ok!')
})

app.use(cors({origin: ["http://localhost:5173"], 
allowedHeaders: ["http://localhost:5173"],
methods: ["GET","POST", "PUT", "DELETE"],
credentials: true 
}));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', QuantAdmin);
app.use('/auth', QuantDes);
app.use('/auth', QuantUsers);
app.use('/auth', SumSalary);
app.use('/auth', SumSalaryAdm);
app.use('/auth', SumSalaryDes);
app.use('/auth', Logout);
app.use('/auth', verifyRouter);
app.use('/auth', QueryUsers);
app.use('/auth', QueryCategory);


app.use(express.static('Public'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})