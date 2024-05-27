import React, {useState} from 'react'
import { Link, Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';

function Mensagem_Gmail() {

  const [campos, setCamnpos] = useState({
  email: '',
  destinatario:'',
  assunto: '',
  remetente:'',
  anexo: '',
  mensagem: '',
  servico: 'Gmail'
 });

 const navigate = useNavigate();

 function handleInputChange(event){
  if(event.target.name === "anexo")
  campos[event.target.name] = event.target.files[0];
  else
  campos[event.target.name] = event.target.value;
   setCampos(campos);
 }

 function sendGmail(){
  const formData = new FormData();
  Object.keys(campos).forEach(key => formData.append(key, campos[key]));
  axios.post('send_gmail', 
            formData,
            {
              headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              }
            })
    .then(response => { console.log(response.data); })
}

//const navigate = useNavigate();

function handleFormSubmit(event){ 

  event.preventDefault(); 
  console.log(campos); 
  sendGmail(campos);
  
    axios.post('cadastrar_envio', campos)
    .then(result => {
       if(result.data.Status){
        setCamnpos(result.data.Result);
        navigate('/painel/emails_enviados')
        }              
      }) 
      .catch(err => console.log(err))
  }


  return(
    <div className="container-fluid loginpage">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
              to=""
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
              >
               <span className='fs-5 fw-bolder d-none d-sm-inline'>
               Opções:
             </span>
             </Link>
             <ul
             className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
             id="menu"
           >
             <li className="w-100">
               <Link
                 to="/painel"
                 className="nav-link text-white px-0 align-middle"
               >
                 <i className="fs-4 bi-speedometer2 ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Painel:</span>
               </Link>
             </li>
             <li className="w-100">
               <Link
                 to="/painel/usuarios"
                 className="nav-link px-0 align-middle text-white"
               >
                 <i className="fs-4 bi-people ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">
                  Gestão de Usuarios:
                 </span>
               </Link>
             </li>
             <li className="w-100">
               <Link
                 to="/painel/categorias"
                 className="nav-link px-0 align-middle text-white"
               >
                 <i className="fs-4 bi-columns ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Categoria:</span>
               </Link>
             </li>
             <li className="w-100">
               <Link
                 to=""
                 className="nav-link px-0 align-middle text-white"
               >
                 <i className="fs-4 bi-person ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Perfil:</span>
               </Link>
             </li>
             <li className="w-100">
                <Link
                  to="/painel/Whatsapp"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-whatsapp ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Whatsapp:</span>
                </Link>
              </li>
             <li className="w-100">
               <Link
                 to="/painel/emails_enviados"
                 className="nav-link px-0 align-middle text-white"
               >
                 <i className="fs-4 bi-envelope-arrow-down ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Emails Enviados:</span>
               </Link>
             </li>
             <li className="w-100">
               <Link
                 className="nav-link px-0 align-middle text-white"
               >
                 <i className="fs-4 bi-power ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Logout</span>
               </Link>
             </li>
           </ul>
         </div>
       </div>
       <div className="col p-0 m-0">
           <div className="p-2 d-flex justify-content-center shadow text-white">
               <h4><strong>Sistema de Gestão de Usuarios:</strong></h4>
           </div>
           <Outlet /><br /><br />

   <div className='container'>

     <form action="" onSubmit={handleFormSubmit}>             
      <label htmlFor="email" style={{margin: '0 100px', fontSize: '25px', color: 'white'}}>Email:</label>
      <label htmlFor="destinatario" style={{margin: '0 248px', fontSize: '25px', color: 'white'}}>Destinatario:</label><br />

      <input type="text" id="text" name="email" placeholder="Email do Destinatário" style={{margin: '0 100px', width: 350, height: 35, fontSize:'20px'}} onChange={handleInputChange} required />  
      <input type="text" id="destinatario" name="destinatario" placeholder="Nome do Destinatário" style={{margin: '0 -40px', width:400, height: 35, fontSize:'20px'}} onChange={handleInputChange} required/><br /><br />
       
      <label htmlFor="assunto" style={{margin: '0 100px', fontSize: '25px', color: 'white'}}>Assunto:</label>
      <label htmlFor="remetente" style={{margin: '0 360px', fontSize: '25px', color: 'white'}}>Remetente:</label><br />

      <input type="text" id="assunto" name="assunto" placeholder="Assunto do Email:" style={{margin: '0 100px', width:500, height: 35, fontSize:'20px'}} onChange={handleInputChange} required/>
      <input type="text" id="remetente" name="remetente" placeholder="Nome do Remetente:" style={{margin: '0 -48px', width:400, height: 35, fontSize:'20px'}} onChange={handleInputChange} required/><br /><br />
      <label htmlFor="anexo" style={{margin: '0 100px', fontSize: '25px', color: 'white'}} >Anexo:</label><br />
      <input type="file" id='anexo' name='anexo' style={{margin: '0 100px', width: 400, height: 30, backgroundColor: 'white'}} onChange={handleInputChange} /> <br /><br />

      <label htmlFor="mensagem" style={{margin: '0 100px', fontSize: '25px', color: 'white'}} >Mensagem:</label><br />
      <textarea name="mensagem" id="mensagem" cols="60" rows="10" style={{margin: '0 100px', fontSize:'20px'}} className='textArea' onChange={handleInputChange} required></textarea><br /><br />
      
      <input type="submit" value="Enviar" style={{margin: '0 100px', width: 120, height: 35, backgroundColor: 'yellow'}}/>      
    </form>
   </div>
                         
</div>           
</div>
</div>
  ) 
}

export default Mensagem_Gmail

