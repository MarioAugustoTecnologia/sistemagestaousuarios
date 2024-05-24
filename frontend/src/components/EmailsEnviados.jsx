import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import validation from "./emailvalidacao";
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';


const EmailsEnviados = () => {
  
  const [email, setEmail] = useState([]); 
  const [IsChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
 
  
useEffect(() => {     
    axios.get('http://localhost:4000/auth/emails_enviados')
    .then(result => {
          if(result.data.Status){
          setEmail(result.data.Result);
     } else {
          alert(result.data.Error)
     }
    }).catch(err => console.log(err))

}, [])  
/
//Desmarca todos os checkbox da tabela.
useEffect(() => {
  const desmarca = document.querySelector('#desmarca');
  const checkElements = document.querySelectorAll('table [type="checkbox"]');
  const marca = document.querySelector('#marca');  

     desmarca.addEventListener('click', () => {
      checkElements.forEach((item) => {
      if(desmarca.checked){
       item.checked = false;
       marca.checked = false; 
       setIsChecked(!IsChecked);     
        }
     }) 
 
})  
})

const handleOnChange = () => {
  setIsChecked(!IsChecked);
}

  const handleDelete = (id) => {    
    
     if(IsChecked){
         axios.delete('http://localhost:4000/auth/excluir_email/'+id)
         .then(result => {
          if(result.data.Status){
          setEmail(result.data.Result); 
          window.location.reload();  
           }else{
          alert(result.data.Error)
          }
      })
     }        
  }

  const handlelogout = () => {
    axios.get('http://localhost:4000/auth/logout')
    .then(result => {
      if(result.data.Status){
          localStorage.removeItem('valid')
          navigate('/')
      }
    })
  }
    
return (     
    <div className="container-fluid loginpage">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" style={{width:230}}>
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
                  to="/painel/email_servico"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-envelope-at ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Serviços de Email:</span>
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
           <Outlet />
           <div className="px-5 mt-5">                  
                <div id="conteudo">                  
                    <h4 style={{textAlign: 'center', color: 'Red', fontSize: '27px'}}><strong>Emails Enviados:</strong></h4>                         
                     <br />
                     <label htmlFor="marca" style={{color:'white', fontSize:'18px'}}>Marcar Todos:</label>
                     <input type="checkbox" name="marca" id="marca" className="inputCheck" style={{margin:'0 10px'}} />
                     <label htmlFor="marca" style={{color:'white', fontSize:'18px'}}>Desmarcar Todos:</label>
                     <input type="checkbox" name="desmarca" id="desmarca" className="inputCheck" style={{margin:'0 10px'}} />
                     
                     <div className="mt-3">
                          <table className="table" style={{width:1520, margin:'0 -45px'}}>
                              <thead className="table-primary">
                                  <tr>
                                  <th scope="col">#</th>  
                                  <th scope="col">Id:</th>                         
                                  <th scope="col" style={{width:220}}>Email:</th>
                                  <th scope="col" style={{width:285}}>Assunto:</th>
                                  <th scope="col" style={{width:320}}>Destinatario:</th>  
                                  <th scope="col" style={{width:320}}>Remetente:</th>                
                                  <th scope="col">Serviço:</th>                                                                            
                                  <th scope="col">Data:</th>
                                  <th scope="col">Hora:</th>
                                  <th scope="col">Ação:</th>                                                       
                                  </tr> 
                              </thead>
                              <tbody>                                
                                {
                                  email.map((val, key) => {
                                    return <tr key = {val.id}>                                         
                                           <th><input type="checkbox" id="sel" name="sel" checked={IsChecked} onChange={handleOnChange}/></th>                                                                                  
                                           <th style={{fontSize:'16px'}}>{val.id}</th>                           
                                           <td style={{fontSize:'16px'}}>{val.email}</td> 
                                           <td style={{fontSize:'16px'}}>{val.assunto}</td> 
                                           <td style={{fontSize:'16px'}}>{val.destinatario}</td>
                                           <td style={{fontSize:'16px'}}>{val.remetente}</td>                                                                       
                                           <td style={{fontSize:'16px'}}>{val.servico}</td> 
                                           <td style={{fontSize:'16px'}}>{val.data}</td>                                                                       
                                           <td style={{fontSize:'16px'}}>{val.hora}</td> 
                                           <td style={{fontSize:'16px'}}><button className="btn btn-danger btn-sm me-2" style={{fontSize:'16px', color:'white'}} onClick={() => handleDelete(val.id)}>Deletar:</button></td>                                                                                                                                                                                    
                                           </tr>                                                                                                                                                                
                                        
                                  })                                                                        
                                }                                        
                              </tbody>
                          </table>     
                    </div>
                  </div><br /> 
                  <Link to="" className="btn" style={{color: 'white', backgroundColor:'ForestGreen', margin: '0 -25px'}}>Consulta por Destinatario:</Link>                                                      
                  <Link to="" className="btn" style={{color: 'white', backgroundColor:'Crimson', margin: '0 55px'}}>Consulta por Remetente:</Link>
                  <Link to="" className="btn" style={{color: 'white', backgroundColor:'Indigo', margin: '0 -25px'}}>Consulta por Data de Envio:</Link>                  
                 
                </div>              
                                   
       </div> 
                 
    </div>
 </div>
 

  )
}

export default EmailsEnviados