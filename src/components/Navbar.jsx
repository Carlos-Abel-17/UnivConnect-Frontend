import { useLocation, NavLink } from "react-router-dom";
import { useMemo } from "react";

import paper_logo from '../../public/paper_logo.svg';
import Home from '../assets/Home.svg';
import HomeFull from '../assets/HomeFull.svg';
import Connect from '../assets/Connect.svg';
import Anunciar from '../assets/Anunciar.svg';
import Notificaciones from '../assets/paper_diagonal_bottom.svg';
import UserProfile from '../assets/UserProfile.svg';
import menu from '../assets/Menu.svg';

function Navbar() {
  const { pathname } = useLocation();

  const navItems = useMemo(() => [
    {
      to: '/',
      icon: Home,
      iconFull: HomeFull,
      label: 'Inicio',
    },
    {
      to: '/Conectar',
      icon: Connect,
      iconFull: Connect,
      label: 'Conectar',
    },
    {
      to: '/Anunciar',
      icon: Anunciar,
      iconFull: Anunciar,
      label: 'Anunciar',
    },
    {
      to: '/Notificaciones',
      icon: Notificaciones,
      iconFull: Notificaciones,
      label: 'Notificaciones',
    },
    {
      to: '/Perfil',
      icon: UserProfile,
      iconFull: UserProfile,
      label: 'Perfil',
    }
  ], []);

  return (
    <nav className="fixed top-0 left-0 min-h-screen w-[70px] bg-black border-r rounded-3xl border-gray-800 flex flex-col items-center justify-between py-6 z-50">

      {/* Logo */}
      <div className="flex items-center justify-center w-full mb-6">
        <img src={paper_logo} alt="logo" className="w-12 h-12 object-contain" />
      </div>

      {/* Navegación */}
      <ul className="flex flex-col items-center gap-6 w-full">
        {navItems.map(({ to, icon, iconFull, label }) => (
          <NavLink
            to={to}
            key={to}
            className="group relative flex items-center justify-center w-12 h-12"
          >
            <div className={`rounded-xl p-2 transition-colors duration-200 ${pathname === to ? 'bg-gray-800 ' : 'group-hover:bg-gray-800'}`}>
              <img
                src={pathname === to ? iconFull : icon}
                alt={label}
                className={`w-6 h-6 object-contain ${pathname === to ? '' : ''}`}
              />
            </div>
            {/* Tooltip (solo si quieres que aparezca el texto al pasar el mouse) */}
            <span className="absolute left-14 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
          </NavLink>
        ))}
      </ul>

      {/* Menú Inferior */}
      <div className="flex flex-col items-center w-full gap-4">
        <NavLink
          to="/Mas"
          className="group flex items-center justify-center w-12 h-12"
        >
          <div className="p-2 rounded-xl group-hover:bg-gray-800">
            <img src={menu} alt="menu" className="w-6 h-6 object-contain" />
          </div>
        </NavLink>

        <span className="text-white text-xs hidden md:block">&copy; 2025</span>
      </div>
    </nav>
  );
}

export default Navbar;
