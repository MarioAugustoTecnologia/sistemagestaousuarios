import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';


const Painel = () => {
   
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
    
  const handleLogout = () => {
    axios.get('http://localhost:4000/auth/logout')
    .then(result => {
      if(result.data.Status){ 
           localStorage.removeItem('valid')         
           navigate('/')
      }
    })
  }

    useEffect(() => {   
    getAdminTotal();
    getUsuarioTotal();
    getSalariosTotal();
    getDesTotal();
    getTotalSAdmin();
    getTotalSDes();
    getAdmins();   
  }, [])  


  const [adminTotal, setAdminTotal] = useState([]); 

  const getAdminTotal = () => {
    axios.get('http://localhost:4000/auth/admin_count')
    .then(result => {
        if(result.data.Status){
            setAdminTotal(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const [usuarioTotal, setUsuarioTotal] = useState([]); 

  const getUsuarioTotal = () => {
    axios.get('http://localhost:4000/auth/user_count')
    .then(result => {
        if(result.data.Status){
            setUsuarioTotal(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const [salarioTotal, setSalarioTotal] = useState([]); 

  const getSalariosTotal = () => {
    axios.get('http://localhost:4000/auth/salario_count')
    .then(result => {
        if(result.data.Status){
            setSalarioTotal(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const [desTotal, setDesTotal] = useState([]);
  
  const getDesTotal = () => {
    axios.get('http://localhost:4000/auth/des_count')
    .then(result => {
        if(result.data.Status){
            setDesTotal(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const [TotalSAdmin, setTotalSAdmin] = useState([]);

  const getTotalSAdmin = () => {
    axios.get('http://localhost:4000/auth/salarioad_count')
    .then(result => {
        if(result.data.Status){
          setTotalSAdmin(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const [TotalSDes, setTotalSDes] = useState([]);

  const getTotalSDes = () => {
    axios.get('http://localhost:4000/auth/salariodes_count')
    .then(result => {
        if(result.data.Status){
          setTotalSDes(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const [admins, setAdmins] = useState([]);

  const getAdmins = () => {
    axios.get('http://localhost:4000/auth/admin_list')
    .then(result => {
        if(result.data.Status){
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
    })
   
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:4000/auth/excluir_usuario/'+id)
    .then(result => {
      if(result.data.Status){
        window.location.reload()
      }else{
        alert(result.data.Error)
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
              <span className="fs-5 fw-bolder d-none d-sm-inline">
               Opções:
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to=""
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
                  <span className="ms-2 d-none d-sm-inline">Perfil</span>
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
              <li className="w-100" onClick={handleLogout}>
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
                <div className="p-5 d-flex justify-content-around mt-3">
                  <div className="px-3 pt-2 pb-3 border shadow-sm w-25 text-white">
                    <div className="text-center pb-1 text-white">
                      <h3>Administradores:</h3>                      
                    </div>
                    <hr />
                    <div className="">
                      <h4><table>
                        <thead className="">
                          <tr>
                            <th scope="col"></th>                                                           
                          </tr>
                        </thead>
                        <tbody className="text-white">
                         {
                           adminTotal.map(
                          (val, key) => {
                            return  <tr>
                                      <td><h4>Total: {val.ADMIN_TOTAL}</h4></td>                                         
                                    </tr> 
                          }
                          ) 
                          }
                          </tbody>
                       </table>
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 pt-2 pb-3 border shadow-sm w-25 text-white">
                    <div className="text-center pb-1 text-white">
                      <h3>Usuarios:</h3>                      
                    </div>
                    <hr />
                    <div className="">
                      <h4><table>
                        <thead className="">
                          <tr>
                            <th scope="col"></th>                                                           
                          </tr>
                        </thead>
                        <tbody>
                         {
                           usuarioTotal.map(
                          (val, key) => {
                            return  <tr>
                                      <td><h4>Total: {val.TOTAL_USUARIOS}</h4></td>                                         
                                    </tr> 
                          }
                          ) 
                          }
                        </tbody>
                        </table>
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 pt-2 pb-3 border shadow-sm w-25 text-white">
                    <div className="text-center pb-1 text-white">
                      <h3> Total de Salarios:</h3>                      
                    </div>
                    <hr />
                    <div className="">
                      <h4><table>
                        <thead className="">
                          <tr>
                            <th scope="col"></th>                                                           
                          </tr>
                        </thead>
                        <tbody>
                         {
                           salarioTotal.map(
                          (val, key) => {
                          return <tr>
                                   <td><h4>Total: {val.TOTAL_SALARIOS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4></td>                                         
                                </tr> 
                          }
                          ) 
                          }
                          </tbody>
                      </table>
                      </h4>
                    </div>
                  </div>
                </div>            
            <br/>            
                <div className="p-5 d-flex justify-content-around mt-3">
                  <div className="px-3 pt-2 pb-3 border shadow-sm w-25 text-white">
                    <div className="text-center pb-1 text-white">
                      <h3>Desenvolvedores:</h3>                      
                    </div>
                    <hr />
                    <div className="">
                      <h4><table>
                        <thead className="">
                          <tr>
                            <th scope="col"></th>                                                           
                          </tr>
                        </thead>
                        <tbody className="text-white">
                         {
                           desTotal.map(
                          (val, key) => {
                            return  <tr>
                                      <td><h4>Total: {val.DES_TOTAL}</h4></td>                                         
                                    </tr> 
                          }
                          ) 
                          }
                          </tbody>
                       </table>
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 pt-2 pb-3 border shadow-sm w-25 text-white">
                    <div className="text-center pb-1 text-white">
                      <h3>Total de Salario/ Administradores:</h3>                      
                    </div>
                    <hr />
                    <div className="">
                      <h4><table>
                        <thead className="">
                          <tr>
                            <th scope="col"></th>                                                           
                          </tr>
                        </thead>
                        <tbody>
                         {
                           TotalSAdmin.map(
                          (val, key) => {
                            return  <tr>
                                      <td><h4>Total: {val.TOTAL_SADMIN.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4></td>                                         
                                    </tr> 
                          }
                          ) 
                          }
                        </tbody>
                        </table>
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 pt-2 pb-3 border shadow-sm w-25 text-white">
                    <div className="text-center pb-1 text-white">
                      <h3>Total de Salario/ Desenvolvedores:</h3>                      
                    </div>
                    <hr />
                    <div className="">
                      <h4><table>
                        <thead className="">
                          <tr>
                            <th scope="col"></th>                                                           
                          </tr>
                        </thead>
                        <tbody>
                         {
                           TotalSDes.map(
                          (val, key) => {
                            return  <tr>
                                      <td><h4>Total: {val.TOTAL_SDES.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4></td>                                         
                                    </tr> 
                          }
                          ) 
                          }
                          </tbody>
                      </table>
                      </h4>
                    </div>
                  </div>
                </div>           
                <div className="px-5 mt-5 text-white">
                      <div className="mt-4 px-5 pt-3">
                      <h3>Lista de Administradores:</h3><br/>
                      <table className="table w-50">
                        <thead className="table-primary">
                          <tr>
                            <th scope="col">Id:</th>                            
                            <th scope="col">Email:</th>
                            <th scope="col">Ação:</th>
                          </tr>
                        </thead>
                        <tbody>
                         {
                           admins.map(
                          (val, key) => {
                            return <tr key = {val.ID}>
                                      <th>{val.ID}</th>                                        
                                      <td>{val.EMAIL}</td>                                        
                                      <td><Link to={"/painel/editar_usuario/"+val.ID} className="btn btn-info btn-sm me-2">Editar:</Link>
                                      <button className="btn btn-warning btn-sm" onClick={() => handleDelete(val.ID)}>Deletar:</button></td>                                          
                                   </tr> 
                          }
                          ) 
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


export default Painel