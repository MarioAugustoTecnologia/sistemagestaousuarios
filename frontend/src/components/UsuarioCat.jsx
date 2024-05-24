import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';

const UsuarioCat = () => { 
  
  const [usuarioCat, setUsuarioCat] = useState([]);
  const [buscacat, setBuscaCat] = useState([]);

  var table = usuarioCat.filter(val => val.CATEGORIA.includes(buscacat))
 
  const navigate = useNavigate();  


  useEffect(() => {
    axios.get('http://localhost:3000/auth/usuario/categoria')
    .then(result => {
      if(result.data.Status) {
        setUsuarioCat(result.data.Result);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))   
    
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/excluir_usuario/'+id)
    .then(result => {
      if(result.data.Status){
        window.location.reload()
      }else{
        alert(result.data.Error)
      }
    })
  } 

  const handlelogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status){
          localStorage.removeItem('valid')
          navigate('/adminlogin')
      }
    })
  } 

    
  return (
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
                      <h4 style={{textAlign: 'center', color: 'Red', fontSize: '27px'}}><strong>Lista de Usuarios:</strong></h4>                         
                     <br />
                    <div className="mt-3">
                          <table className="table">
                              <thead className="table-primary">
                                  <tr>
                                  <th scope="col">Id:</th>
                                  <th scope="col">Nome:</th>
                                  <th scope="col">Email:</th>
                                  <th scope="col">Telefone:</th>
                                  <th scope="col">Nascimento:</th>  
                                  <th scope="col">Salario:</th>                
                                  <th scope="col">Categoria:</th>                                             
                                  <th scope="col">Ação:</th>                            
                                  </tr> 
                              </thead>
                              <tbody>                                
                                {
                                  table.map((val) => {
                                    return <tr>                                            
                                           <th>{val.id}</th>
                                           <td>{val.nome}</td>
                                           <td>{val.email}</td> 
                                           <td>{val.fone}</td> 
                                           <td>{val.nascimento}</td> 
                                           <td>{val.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>                                
                                           <td>{val.CATEGORIA}</td>                                                                                                                   
                                           <td><Link to={"/painel/editar_usuario/"+val.id} className="btn btn-info btn-sm me-2">Editar:</Link>
                                           <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(val.id)}>Deletar:</button>
                                           <Link to={"/painel/perfil/"+val.id} className="btn btn-primary btn-sm me-2">Detalhes:</Link></td>                                                                                                                                         
                                           </tr> 
                                  })                                                                        
                                }                                        
                              </tbody>
                          </table>     
                  </div>
                  </div><br />
                  <div className="mb3">
                  <label htmlFor="Nome" style={{color: 'white', fontSize: '25px'}}>Busca por categoria:</label><br />
                  <input type="search" style={{width: 300, padding: '4px'}} value={buscacat} onChange={(e) => setBuscaCat(e.target.value)} />  
                  </div>                             
                 </div>                           
                                   
       </div> 
                 
    </div>
 </div>
  )
}

export default UsuarioCat