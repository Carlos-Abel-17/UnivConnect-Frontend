import paper_logo from '../../public/paper_logo.svg';
import Home from '../assets/Home.svg';
import Connect from '../assets/connect.svg';
import Anunciar from '../assets/Anunciar.svg';
import paperDTop from '../assets/paper_diagonal_top.svg';
import paperDBottom from '../assets/paper_diagonal_bottom.svg';
import menu from '../assets/Menu.svg';
import UserProfile from '../assets/UserProfile.svg';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 min-h-screen w-16 md:w-64 bg-black border-r border-gray-700 p-4 flex flex-col justify-between z-50 transition-all duration-300">

            <div className="flex items-center space-x-3 px-4 mt-4">
                <img src={paper_logo} alt="logo" className="w-6 h-6 md:w-6 md:h-6 object-contain" />
                <h1 className="text-white font-bold text-xl hidden md:block">UnivConnect</h1>
            </div>
            <ul className="mt-10 space-y-6 px-4 text-white text-base">
                {[
                    { to: "/", icon: Home, label: "Inicio" },
                    { to: "/Conectar", icon: Connect, label: "Conectar" },
                    { to: "/Anunciar", icon: Anunciar, label: "Anunciar" },
                    { to: "/Mensajes", icon: paperDTop, label: "Mensajes" },
                    { to: "/Notificaciones", icon: paperDBottom, label: "Notificaciones" },
                    { to: "/Perfil", icon: UserProfile, label: "Perfil" },
                ].map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center pr-2 pl-2 pt-1 pb-1 space-x-3 rounded-[0.5vw]
                            hover:text-blue-400 cursor-pointer hover:bg-gray-800
                            ${isActive ? 'text-blue-400 bg-gray-800' : 'text-white'}`
                        }
                    >
                        <img src={icon} alt={label} className="w-10 h-10 md:w-6 md:h-6 object-contain" />
                        <span className="hidden md:inline">{label}</span>
                    </NavLink>
                ))}
            </ul>

            <ul className="mt-10 space-y-6 px-4 text-white text-base">
                <NavLink
                    to="/Mas"
                    className={({ isActive }) =>
                        `flex items-center pr-2 pl-2  pt-1 pb-1 space-x-3 rounded-[0.5vw]
                        hover:text-blue-400 cursor-pointer hover:bg-gray-800
                        ${isActive ? 'text-blue-400 bg-gray-800' : 'text-white'}`
                    }
                >
                    <img src={menu} alt="menu" className="w-6 h-6 md:w-6 md:h-6 object-contain" />
                    <span className="hidden md:inline">Más</span>
                </NavLink>
            </ul>

            <div className="text-white px-4 pb-6 text-sm hidden md:block">
                &copy; 2025 UnivConnect
            </div>
        </nav>
    );
}

export default Navbar;
