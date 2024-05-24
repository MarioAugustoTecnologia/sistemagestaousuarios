import React, {useEffect, useState } from "react";
import { Link, Outlet, useNavigate} from "react-router-dom";
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";

const Categorias = () => {

  const [categoria, setCategoria] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {     
    axios.get('http://localhost:4000/auth/categoria')
    .then(result => {
          if(result.data.Status){
          setCategoria(result.data.Result);
     } else {
          alert(result.data.Error)
     }
    }).catch(err => console.log(err))
}, []) 

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
           <Outlet/>
           <div className="px-5 mt-5 ">
                    <div className="d-flex justify-content-center text-white">
                         <h3>Lista de Categorias:</h3>
                    </div><br/><br/>
                    <Link to="/painel/add_categoria" className="btn btn-success">Adicionar Categoria</Link><br/><br/> 
                    <div className="mt-3 w-25">
                          <table className="table">
                              <thead  className="table-primary">
                                  <tr>
                                  <th scope="col">Id:</th>
                                  <th scope="col">Nome:</th>
                                  </tr> 
                              </thead>
                              <tbody>
                                {
                                  categoria.map((val, key) => {
                                    return <tr key = {val.id}>
                                           <th>{val.id}</th>
                                           <td>{val.nome}</td>                                           
                                          </tr> 
                                  }) 
                                }                                  
                              </tbody>
                          </table>     
                    </div>                  
                </div>   
             
            
       </div>           
    </div>
 </div>

  )
}

export default Categorias