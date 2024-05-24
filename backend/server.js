const express = require('express');
const app = express();
const cors = require('cors');
const RegisterUsers = require('./Routes/RegisterUsers.js');
const RegisterCategory = require('./Routes/RegisterCategory.js');
const RegisterEmail = require('./Routes/RegisterEmail.js')
const verifyRouter = require('./Routes/VerifyUsers.js');
const QueryUsers = require('./Routes/QueryUsers.js');
const QueryCategory = require('./Routes/QueryCategory.js');
const QueryEmails = require('./Routes/QueryEmails.js');
const UpdateUsers = require('./Routes/UpdateUsers.js');
const DeleteUser = require('./Routes/DeleteUser.js');
const DeleteEmail = require('./Routes/DeleteEmail.js')
const QuantAdmin = require('./Routes/QuantAdmin.js');
const QuantDes = require('./Routes/QuantDes.js');
const QuantUsers = require('./Routes/QuantUsers.js');
const SumSalary = require('./Routes/SumSalary.js');
const SumSalaryAdm = require('./Routes/SumSalaryAdm.js');
const SumSalaryDes = require('./Routes/SumSalaryDes.js');
const Logout = require('./Routes/Logout.js');
const sendGmail = require('./Routes/sendGmail.js');
const sendOutlook = require('./Routes/sendOutlook.js');
const whats = require('./Routes/Whats.js');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use(cors({origin: ["http://localhost:5173"], 
methods: ["GET","POST", "PUT", "DELETE"],
credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', RegisterUsers);
app.use('/auth', RegisterCategory);
app.use('/auth', RegisterEmail);
app.use('/auth', verifyRouter);
app.use('/auth', QueryUsers);
app.use('/auth', QueryCategory);
app.use('/auth', QueryEmails);
app.use('/auth', UpdateUsers);
app.use('/auth', DeleteUser);
app.use('/auth', DeleteEmail);
app.use('/auth', QuantAdmin);
app.use('/auth', QuantDes);
app.use('/auth', QuantUsers);
app.use('/auth', SumSalary);
app.use('/auth', SumSalaryAdm);
app.use('/auth', SumSalaryDes);
app.use('/auth', Logout);


app.use(sendGmail);
app.use(sendOutlook);
app.use(whats);


app.use(express.static('Public'));


app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"})
})
  

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT);
})



