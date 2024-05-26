import React, {useState} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';

function Mensagem_Outlook() {

    const navigate = useNavigate();

    const [campos, setCampos] = useState({
     nome: '',
     email: '',
     mensagem: '',
     anexo: ''
   
    });
   
    function handleInputChange(event){
     if(event.target.name === "anexo")
     campos[event.target.name] = event.target.files[0];
     else
     campos[event.target.name] = event.target.value;
      setCampos(campos);
    }
   
    function sendOutlook(){
     const formData = new FormData();
     Object.keys(campos).forEach(key => formData.append(key, campos[key]));
     axios.post('http://localhost:3000/send_outlook', 
               formData,
               {
                 headers: {
                   "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                 }
               })
       .then(response => { console.log(response.data); })
   }
   
   function handleFormSubmit(event){ 
     event.preventDefault(); 
     console.log(campos); 
     sendOutlook(campos);
   }

   const handlelogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status){
          localStorage.removeItem('valid')
          navigate('/')
      }
    })
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
                <li className="w-100" onClick={handlelogout}>
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
       
         <label htmlFor="email" style={{margin: '0 100px', fontSize: '25px', color: 'white'}}>Email:</label><br />
         <input type="email" id="email" name="email" placeholder="Email do Destinatário" style={{margin: '0 100px', width: 400, height: 35}} onChange={handleInputChange} /><br /><br />
   
         <label htmlFor="nome" style={{margin: '0 100px', fontSize: '25px', color: 'white'}}>Nome:</label><br />
         <input type="text" id="nome" name="nome" placeholder="Nome do remetente:" style={{margin: '0 100px', width: 400, height: 35}} onChange={handleInputChange}/><br /><br />
   
         <label htmlFor="anexo" style={{margin: '0 100px', fontSize: '25px', color: 'white'}} >Anexo:</label><br />
         <input type="file" id='anexo' name='anexo' style={{margin: '0 100px', width: 400, height: 30, backgroundColor: 'white'}} onChange={handleInputChange} /> <br /><br />
   
         <label htmlFor="mensagem" style={{margin: '0 100px', fontSize: '25px', color: 'white'}} >Mensagem:</label><br />
         <textarea name="mensagem" id="mensagem" cols="60" rows="10" style={{margin: '0 100px'}} className='textArea' onChange={handleInputChange}></textarea><br /><br />
         <input type="submit" value="Enviar" style={{margin: '0 100px', width: 120, height: 35, backgroundColor: 'blue', color: 'white'}}/>
         
       </form>
      </div>
                            
   </div>           
   </div>
   </div>
     ) 
   }
   
   export default Mensagem_Outlook
   