import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Painel from './components/Painel';
import Usuarios from './components/Usuarios';
import Perfil from './components/Perfil';
import Categorias from './components/Categorias';
import Addcategoria from './components/Addcategoria';
import CadUsuarios from './components/CadUsuarios';
import EditarUsuario from './components/EditarUsuario';
import UsuarioNome from './components/UsuarioNome';
import UsuarioCat from './components/UsuarioCat';
import PrivateRoutes from './components/PrivateRoutes';
import Mensagem_Gmail from './components/Mensagem_Gmail';
import Email_Servico from './components/Email_Servico';
import EmailsEnviados from './components/EmailsEnviados';
import Mensagem_Outlook from './components/Mensagem_Outlook';
import Whatsapp from './components/Whatsapp';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() { 
  
  return (
   <BrowserRouter>
    <Routes>   
    <Route path='/' element={<Login />}></Route>
    <Route path='/painel' element={<PrivateRoutes><Painel /></PrivateRoutes>}></Route>
    <Route path='/painel/usuarios' element={<PrivateRoutes><Usuarios /></PrivateRoutes>}></Route>
    <Route path='/painel/add_usuarios' element={<PrivateRoutes><CadUsuarios /></PrivateRoutes>}></Route>
    <Route path='/painel/editar_usuario/:id' element={<PrivateRoutes><EditarUsuario /></PrivateRoutes>}/>
    <Route path='/painel/usuario/nome' element={<PrivateRoutes><UsuarioNome /></PrivateRoutes>}/> 
    <Route path='/painel/usuario/categoria' element={<PrivateRoutes><UsuarioCat /></PrivateRoutes>}/>  
    <Route path='/painel/categorias' element={<PrivateRoutes><Categorias /></PrivateRoutes>}/>
    <Route path='/painel/add_categoria' element={<PrivateRoutes><Addcategoria /></PrivateRoutes>}/>
    <Route path='/painel/perfil/:id' element={<PrivateRoutes><Perfil /></PrivateRoutes>}/>
    <Route path='/painel/mensagem_gmail' element={<PrivateRoutes><Mensagem_Gmail /></PrivateRoutes>}/>
    <Route path='/painel/mensagem_outlook' element={<PrivateRoutes><Mensagem_Outlook /></PrivateRoutes>}/>
    <Route path='/painel/emails_enviados' element={<PrivateRoutes><EmailsEnviados /></PrivateRoutes>}/>
    <Route path='/painel/email_servico' element={<PrivateRoutes><Email_Servico /></PrivateRoutes>}/> 
    <Route path='/painel/Whatsapp' element={<PrivateRoutes><Whatsapp /></PrivateRoutes>}/>  
    </Routes>
   </BrowserRouter>
  )
}

export default App
