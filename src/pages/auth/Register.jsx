import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import socialImg from "../../assets/img/social_img.svg";
import paper_logo from "../../../public/paper_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetDepart } from "../../redux/features/departament/Thunk/DeparThunk";
import { FindProvi } from "../../redux/features/province/Thunk/ProviThunk";
import { FindDist } from "../../redux/features/district/Thunk/DistThunk";
import { ValidateEmailinstiThunk } from "../../redux/features/emailinsti/Thunk/emailinstiThunk";

function Register() {
  const [emailValue, setEmailValue] = useState("");

  useEffect(()=>{
    const handler = setTimeout(()=>{
      console.log(emailValue)
      if(emailValue.includes('@')){
        const value = emailValue.split('@')[1];
        dispath(ValidateEmailInsti(value))
      }
    }, 600)

    return ()=>clearTimeout(handler);
  }, [emailValue]);

  const dispath = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const depart = useSelector((state)=>state.Depart);
  const provi = useSelector((state)=>state.Provi);
  const dist = useSelector((state)=>state.Dist);
  const emailinsti = useSelector((state)=>state.EmailInsti);

  const onSubmit = (data) => {
    console.log(data);
  };

  const genero = [
    { id: 0, type: '', name: 'Selecione una opcion' },
    { id: 1, type: 'M', name: 'Mujer' },
    { id: 2, type: 'H', name: 'Hombre' },
    { id: 3, type: 'PND', name: 'Prefiero no decirlo' }
  ];
 
  useEffect(()=>{
    dispath(GetDepart())
  },[]);

  const ChangeOptionDepar = (value) => {
    dispath(FindProvi(value))
  };

  const ChangeOptionProvi = (value) => {
  dispath(FindDist(value))
  };

  const ValidateEmailInsti = (value) =>{
    dispath(ValidateEmailinstiThunk(value))
  }
  console.log(emailinsti.data);

  return (
    <div className="flex w-full h-screen ">
      {/* //! Imagen lateral - solo visible en pantallas */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative ">
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <img
            src={paper_logo}
            alt="logo"
            className="w-6 h-6 object-contain"
          />
          <h1 className="text-white font-bold text-xl">UnivConnect</h1>
        </div>
        <img
          src={socialImg}
          alt="social presentation"
          className="w-3/4 max-w-md"
        />
      </div>

      {/* //! Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 md:p-10 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Registro
          </h2>

          <div className=" mb-4">
            <label>
              Nombres <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              id="Name"
              placeholder="Nombres"
              {...register("Name", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
          </div>

          <div className=" mb-4">
            <label>
              Apellidos <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              id="LastName"
              placeholder="Apellidos"
              {...register("LastName", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
          </div>
          <div className=" mb-4">
            <label>
              Nombre de usuario <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              id="NameUser"
              placeholder="@example123"
              {...register("NameUser", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
          </div>

          <div className=" mb-4">
            <label>
              Fecha de Nacimiento <span className="text-red-600">(*)</span>
            </label>
            <input
              type="date"
              id="Birthdate"
              {...register("Birthdate", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Género */}
            <div>
              <label htmlFor="gender">Género</label>
              <select
                id="gender"
                {...register("gender", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              >
                {genero.map((par) => (
                  <option key={par.id} value={par.type}>
                    {par.name}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Departamento */}
            <div>
              <label htmlFor="departamento">Departamento</label>
              <select
                id="departamento"
                {...register("departamento", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
                onChange={(e)=>ChangeOptionDepar(e.target.value)}
              >
                <option value="0">Seleccione un departamento</option>
                {depart.data?.map((par)=>(
                 <option key={par.id} value={par.id}>{par.nameDepar}</option>
                ))}
              </select>
              {errors.departamento && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.departamento.message}
                </p>
              )}
            </div>

            {/* Provincia */}
            <div>
              <label htmlFor="provincia">Provincia</label>
              <select
                id="provincia"
                {...register("provincia", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
                onChange={(e)=>ChangeOptionProvi(e.target.value)}
              >
                <option value="0" >Seleccione una provincia</option>
                {provi.data?.map((par)=>(
                  <option key={par.id} value={par.id}>{par.name}</option>
                ))}
              </select>
              {errors.provincia && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.provincia.message}
                </p>
              )}
            </div>

            {/* Distrito */}
            <div>
              <label htmlFor="distrito">Distrito</label>
              <select
                id="distrito"
                {...register("distrito", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              >
                <option value="">Seleccione un distrito</option>
                {dist.data?.map((par)=>(
                  <option key={par.id} value={par.id}>{par.name}</option>
                ))}
              </select>
              {errors.distrito && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.distrito.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="email">
              Correo Institucional
            </label>
            <div className="absolute top-0 right-0 mt-1 mr-1 group cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                i
              </div>
              <div className="absolute right-6 top-1 w-64 p-2 text-xs text-white bg-gray-700 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                El correo institucional solo se usará para confirmar que eres estudiante de la UTP y no se guardará en nuestra base de datos.
              </div>
            </div>
            <input
              id="email"
              type="email"
              placeholder="correo institucional"
              {...register("email", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              onChange={(e)=>setEmailValue(e.target.value)}
            />
            {(errors.email && emailinsti.status === 'failed') && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {

          }

          <div className="mb-6">
            <label
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              {...register("password", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1785de] hover:bg-[#0e65b5] transition duration-200 text-white font-semibold py-2 px-4 rounded-md mb-4"
          >
            Registar
          </button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?
              <Link to="/auth/Login">
                <span className="text-[#1785de] font-medium hover:underline ml-1">
                  Inicia Sesión
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;