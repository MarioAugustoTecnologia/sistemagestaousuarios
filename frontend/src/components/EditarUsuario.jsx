import React, {useEffect, useState} from "react";
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import validation from './Editarvalidacao';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';

const EditarUsuario = () => {

    const {id} = useParams()
    const [usuarios, setUsuarios] = useState({
      nome:'',
      email:'', 
      senha:'',     
      fone:'', 
      data_nascimento:'', 
      cat_id:'',
      salario:''
     
  }) 
  const [categoria, setCategoria] = useState([]) 

    useEffect(() => {     
      axios.get('http://localhost:3000/auth/categoria')
      .then(result => {
        if(result.data.Status){
          setCategoria(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
       
      axios.get('http://localhost:3000/auth/usuario/'+id)
      .then(result => {
        setUsuarios({
          ...usuarios,
          nome: result.data.Result[0].nome,
          email: result.data.Result[0].email,       
          fone: result.data.Result[0].fone,                                        
          salario: result.data.Result[0].salario,          
          cat_id: result.data.Result[0].cat_id
               
        })

      }).catch(err => console.log(err))

    }, [])

    const navigate = useNavigate(); 
    const [errors, setErrors] = useState({});  
    
    const handleSubmit = (event) => {
    event.preventDefault();
  
      setErrors(validation(usuarios));
      if(errors.nome === "" && errors.email === "" && errors.senha === "" && errors.fone === "" && errors.data_nascimento === "" && errors.cat_id === ""  &&  errors.salario === ""){
      axios.put('http://localhost:3000/auth/atualizar_usuario/'+id, usuarios)
      .then(result => {
           if(result.data.Status){
            navigate('/painel/usuarios');
           } else {
            alert(result.data.Error)
           }   
      }) 
      .catch(err => console.log(err)) 
    }
 
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
              <div className='loginpage'>
    <br/>       
      <div className='d-flex justify-content-center align-items-center vh-100'>       
        <div className='bg-white p-4 rounded w-50 border'>
            <h4><center>Editar Usuario:</center></h4><br/>
           <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>      
            <label htmlFor='nome' style={{fontSize:'20px', margin:'0 115px'}}>Nome:</label>
            <input type='text' style={{fontSize:'20px', width:460, margin:'0 115px'}} placeholder='Entre com o nome:' className='form-control rounded-0' value={usuarios.nome} onChange={(e) => setUsuarios({...usuarios, nome: e.target.value})} name='nome'/>
            {errors.nome && <span className='text-danger' style={{margin:'0 115px'}}>{errors.nome}</span>}            
            </div>
            <div className='mb-3'>           
            <label htmlFor='email' style={{fontSize:'20px', margin:'0 115px'}}>Email:</label>
            <input type='email' style={{fontSize:'20px', width:385, margin:'0 115px'}} placeholder='Entre com o email:' className='form-control rounded-0' value={usuarios.email} onChange={(e) => setUsuarios({...usuarios, email: e.target.value})} name='email'/>
            {errors.email && <span className='text-danger' style={{margin:'0 115px'}}>{errors.email}</span>}        
            </div> 
            <div className='mb-3'>           
            <label htmlFor='senha' style={{fontSize:'20px', margin:'0 115px'}}>Senha:</label>
            <input type='password' style={{width:300, margin:'0 115px'}} placeholder='Entre com a senha:' className='form-control rounded-0' value={usuarios.senha} onChange={(e) => setUsuarios({...usuarios, senha: e.target.value})} name='email'/>
            {errors.senha && <span className='text-danger' style={{margin:'0 115px'}}>{errors.senha}</span>}        
            </div>         
            <div className='mb-3'>           
            <label htmlFor='fone' style={{fontSize:'20px', margin:'0 115px'}}>Telefone:</label>
            <input type='text' style={{fontSize:'20px', width:225, margin:'0 115px'}} placeholder='Entre com o telefone:' className='form-control rounded-0' value={usuarios.fone} onChange={(e) => setUsuarios({...usuarios, fone: e.target.value})} name='fone'/>
            {errors.fone && <span className='text-danger' style={{margin:'0 115px'}}>{errors.fone}</span>}        
            </div>
            <div className='mb-3'>           
            <label htmlFor='data' style={{fontSize:'20px', margin:'0 115px'}}>Data de Nascimento:</label>
            <input type='date' placeholder='Entre com a data:' style={{fontSize:'20px', width:225, margin:'0 115px'}} className='form-control rounded-0' value={usuarios.data_nascimento} onChange={(e) => setUsuarios({...usuarios, data_nascimento: e.target.value})} name='data_nascimento'/> 
            {errors.data_nascimento && <span className='text-danger' style={{margin:'0 115px'}}>{errors.data_nascimento}</span>}     
            </div>
            <div className='mb-3'>
                  <label htmlFor='categoria' style={{fontSize:'20px', margin:'0 115px'}}  className='form-label'>Categoria:</label>
                  <select style={{fontSize:'20px', width:225, margin:'0 115px'}} name='categoria' id='categoria' className='form-select' value={usuarios.cat_id} onChange={(e) => setUsuarios({...usuarios, cat_id: e.target.value})}>
                       {categoria.map(val =>{
                        return <option value={val.id}>{val.nome}</option>
                       })}
                  </select> 
                  {errors.cat_id && <span className='text-danger' style={{margin:'0 115px'}}>{errors.cat_id}</span>}   
             </div> 
              
             <div className='mb-3'>           
                <label htmlFor='salario' style={{fontSize:'20px', margin:'0 115px'}}>Salario:</label>
                <input type='text' style={{fontSize:'20px', width:300, margin:'0 115px'}} placeholder='Entre com salario:' className='form-control rounded-0' value={usuarios.salario} onChange={(e) => setUsuarios({...usuarios, salario: e.target.value})} name='salario' autoComplete='off'/>
                {errors.salario && <span className='text-danger' style={{margin:'0 115px'}}>{errors.salario}</span>}
             </div>             
            <button type='submit' className='btn btn-success border w-25 rounded-0' style={{width:225, margin:'0 250px'}} onClick={() => setUsuarios({...usuarios})}>Atualizar</button>                  
            </form>
       </div>   
   
     </div>
  </div>  
                              
</div>           
</div>
</div>

  )
}

export default EditarUsuario