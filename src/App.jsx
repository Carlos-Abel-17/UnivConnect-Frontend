import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Conectar from './pages/Conectar';
import Anunciar from './pages/Anunciar';
import Mensajes from './pages/Mensajes';
import Notificaciones from './pages/Notificaciones';
import Perfil from './pages/Perfil';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const location = useLocation();
  const CondiLocation =location.pathname.toLocaleLowerCase().startsWith('/auth');

  return (
    <>
    {
      !CondiLocation &&
      <Navbar />
    }
      {/* Este div desplazará el contenido 64 (w-64) para que no quede detrás del navbar */}
      <div className={ CondiLocation ? "flex w-full h-full" : "ml-16 md:ml-64 p-6 bg-[#000000] min-h-screen transition-all duration-300"}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Conectar" element={<Conectar />} />
          <Route path="/Anunciar" element={<Anunciar />} />
          <Route path="/Mensajes" element={<Mensajes />} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/Perfil" element={<Perfil />} />
          {/* //!seccion de auth */}
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/Register' element={<Register />}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
