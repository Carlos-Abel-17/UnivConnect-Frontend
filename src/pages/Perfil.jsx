import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../assets/UserProfile.svg';
import { BsGear } from "react-icons/bs";
import { useEffect, useId } from 'react';
import { FetchUserById } from '../redux/features/User/Thunk/UserThunk';

function Perfil() {
    const dispath = useDispatch();
    const user = useSelector((state)=>state.UserR);
    const status = useSelector((state)=>state.UserR);

    useEffect(()=>{
        const userId = 8;
        dispath(FetchUserById(userId)) 
    },[]);
    console.log('usuario ',user,'estado ',status);
  return (
    <div className="w-full border text-white flex justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Contenedor principal */}
        <div className="flex flex-col md:flex-row md:justify-around items-center gap-4">
          {/* Imagen */}
          <div className="p-2">
            <img
              src={UserProfile}
              alt="UserProfile"
              className="rounded-full w-20 h-20 md:w-28 md:h-28 object-contain"
            />
          </div>

          {/* Nombre y botones */}
          <div className="flex flex-col gap-2 w-full md:w-auto text-center md:text-left">
            {/* Nombre y botones */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h1 className="text-lg font-semibold">ABEL_AGUADO17</h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer font-bold py-1 px-3 rounded text-sm">
                  Editar Perfil
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 font-bold py-1 px-3 rounded text-sm">
                  Ver Archivo
                </button>
                <button className="text-white text-xl cursor-pointer">
                  <BsGear />
                </button>
              </div>
            </div>

            {/* Conexiones */}
            <div className="flex justify-center md:justify-start gap-4 text-sm">
              <h4>
                <span className="font-bold">0</span> Connects
              </h4>
              <h4>
                <span className="font-bold">0</span> Seguidores
              </h4>
              <h4>
                <span className="font-bold">0</span> Seguidos
              </h4>
            </div>
            <div>
                <h4 className='font-semibold'>
                    Carlos Abel AR
                </h4>
                {/* //!Descripcion del usuario como maximo 250 caracteres */}
                <h4>
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                 Accusantium temporibus tenetur nulla
                </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
