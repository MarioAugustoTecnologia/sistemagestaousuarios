import React, { useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import QRCode from "qrcode.react";
import validation from './whatsvalidacao';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';

const Whatsapp = () => {

  const [loading, setLoading] = useState(false);
  const [qrcode, setQRCode] = useState(false);
 
  
  const [values, setValues] = useState({
    phone:'',
    msg:'',
    archive:''
    
  })  

  const [errors, setErrors] = useState({}); 

    const getQRCode = async () => {
         
         setErrors(validation(values));
        if(errors.phone === "" && errors.msg === ""){
          setLoading(true);
          const res = await axios.post("http://localhost:4000/whats", values);
          setQRCode(res.data);
          setLoading(false);
        }    
      

    }
  const navigate = useNavigate();

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

   <div className="container">

       <label htmlFor="phone" style={{color: 'white', fontSize: '25px'}}>Telefone:</label>{errors.phone && <span className='text-warning' style={{fontSize: '25px', margin: '0 30px'}}><strong>{errors.phone}</strong></span>}<br />
       <input type="text" name="phone" id="phone" style={{width: 250}} onChange={(e) => setValues({...values, phone: e.target.value})}/><br /><br />

       <label htmlFor="inputGroupFile01" style={{color: 'white', fontSize: '25px'}}>Arquivo:</label><br />
       <input type="file" name="archive" id="inputGroupFile01" className='form-control rounded-0' style={{width: 300, backgroundColor: 'white'}} onChange={(e) => setValues({...values, archive: e.target.files[0]})}/><br /><br />

       <label htmlFor="mensagem" style={{color: 'white', fontSize: '25px'}}>Mensagem:</label>{errors.msg && <span className='text-warning' style={{fontSize: '25px', margin: '0 30px'}}><strong>{errors.msg}</strong></span>}<br />
       <textarea cols='60' rows='10' name="msg" id="msg" onChange={(e) => setValues({...values, msg: e.target.value})} /><br /><br />

       <button className="btn" style={{backgroundColor: '#00FF00', padding:'8px', color: 'white'}} onClick={getQRCode}>Obter Código Qr:</button>
         {!loading && qrcode && (
        <div style={{ margin: "0 100px" }}>
          <QRCode value={qrcode} />
        </div>
        )}
      {loading && "Aguardando pelo QrCode..."}
      
    </div>   

                         
</div>           
</div>
</div>
  );
};

export default Whatsapp;