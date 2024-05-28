const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const url = require('url');
const bodyparser = require('body-parser');
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
const { Socket } = require('socket.io');


app.use(bodyparser());

var clientResponseRef;
app.get('/*', (req, res) => {
 var pathname = url.parse(req.url).pathname;
 var obj = {
  pathname: pathname,
  method: "get",
  params: req.query
 }

 io.emit("page-request", obj);
 clientResponseRef = res;

})

app.post('/*', (req, res) => {
  var pathname = url.parse(req.url).pathname;
  var obj = {
   pathname: pathname,
   method: "post",
   params: req.body
  }
 
  io.emit("page-request", obj);
  clientResponseRef = res;
})



io.on("connection", (socket) => {
  console.log('a node connected');
  socket.on("page-response", (response) => {
     clientResponseRef.send(response)
  })
})



var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
http.listen(server_port, () => {
  console.log('Escutanto em *:' + server_port);
})

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



