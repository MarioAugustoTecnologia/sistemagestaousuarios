const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const QuantAdmin = require('./Routes/QuantAdmin');
const QuantDes = require('./Routes/QuantDes');
const QuantUsers = require('./Routes/QuantUsers');
const SumSalary = require('./Routes/SumSalary');
const SumSalaryAdm = require('./Routes/SumSalaryAdm');
const SumSalaryDes = require('./Routes/SumSalaryDes');
const Logout = require('./Routes/Logout');
const verifyRouter = require('./Routes/VerifyUsers');
const QueryUsers = require('./Routes/QueryUsers');
const QueryCategory = require('./Routes/QueryCategory')
const QueryEmails = require('./Routes/QueryEmails');
const UpdateUsers = require('./Routes/UpdateUsers');
const RegisterUsers = require('./Routes/RegisterUsers');
const RegisterCategory = require('./Routes/RegisterCategory');
const RegisterEmail = require('./Routes/RegisterEmail');
const DeleteUser = require('./Routes/DeleteUser');
const DeleteEmail = require('./Routes/DeleteEmail');
const sendGmail = require('./Routes/sendGmail');
const sendOutlook = require('./Routes/sendOutlook');
const whats = require('./Routes/Whats');
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));

app.use(cors({origin: ["https://sistemagestaousuarios.onrender.com"], 
methods: ["GET","POST", "PUT", "DELETE"],
credentials: true 
}));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', RegisterUsers);
app.use('/auth', RegisterCategory);
app.use('/auth', RegisterEmail);
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
app.use('/auth', QueryEmails);
app.use('/auth', UpdateUsers);
app.use('/auth', DeleteUser);
app.use('/auth', DeleteEmail);

app.use(sendGmail);
app.use(sendOutlook);
app.use(whats);


app.use(express.static('Public'));

app.listen(port, console.log('Servidor ouvindo na porta:' + port))



