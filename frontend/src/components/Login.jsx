import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style.css';


const Login = () => {

  const [values, setValues] = useState({
    email:'',
    senha:''
})

const [error, setError] = useState(null)
const navigate = useNavigate()
axios.defaults.withCredentials = true;


const handleSubmit = (event) => {
  event.preventDefault(); 
  axios.post('http://localhost:10000/auth/adminlogin', values)
  .then(result => {
    if(result.data.loginStatus){
         localStorage.setItem('valid', true)
         navigate('/painel')
      }else{
         setError(result.data.Error)
      }
  
  }).catch(err => console.log(err))
} 

  return (
    <div className='loginpage'>
      <div className='text-white'><h2><br/><center><strong>Sistema de Gestão de Usuarios:</strong></center></h2></div>             
       <div className='d-flex justify-content-center align-items-center vh-100'>
         <div className='bg-white p-3 rounded w-25 border'>
            <div className='text-danger'>{error && error}</div>
               <h2>Login:</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb3'>                  
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder='Entre com o email:' name='email'
                    className='form-control rounded-0' onChange={(e) => setValues({...values, email : e.target.value})}/>
                </div>
                <br/>
                <div className='mb3'>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" placeholder='Entre com a senha:' name='senha'
                    className='form-control rounded-0' onChange={(e) => setValues({...values, senha : e.target.value})}/>
                </div>
                <div className='mb1'>
                    <input type='checkbox' name='tick' id='tick' className='me-2'/>
                    <label htmlFor='senha'><strong>Você aceita nossos termos e condições:</strong></label>
                </div><br/>
                <button className='btn btn-success w-50 rounded-0'>Entrar:</button>       
            </form>
         </div>

      </div>
    </div>
  )
}

export default Login