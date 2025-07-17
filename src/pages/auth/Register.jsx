import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import socialImg from "../../assets/img/social_img.svg";
import paper_logo from "../../../public/paper_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetDepart } from "../../redux/features/departament/Thunk/DeparThunk";
import { FindProvi } from "../../redux/features/province/Thunk/ProviThunk";
import { FindDist } from "../../redux/features/district/Thunk/DistThunk";
import { ValidateEmailinstiThunk, VerifyCodeEmailThunk } from "../../redux/features/emailinsti/Thunk/emailinstiThunk";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function Register() {
  //-------------------
  //? VARIABLES
  //-------------------
  const depart = useSelector((state)=>state.Depart);
  const provi = useSelector((state)=>state.Provi);
  const dist = useSelector((state)=>state.Dist);
  const emailinsti = useSelector((state)=>state.EmailInsti.validate);
  const verifycode = useSelector((state)=>state.EmailInsti.verify);
  const [emailValue, setEmailValue] = useState("");
  const [step,setStep] = useState(1);
  const [vcode, setVcode] = useState({email:'',code:''});
  const dispath = useDispatch();
  const {register, handleSubmit, formState: { errors }, watch} = useForm();
  const watchFields = watch(["Name", "LastName", "Birthdate", "gender", "departamento", "provincia", "distrito"]).every(value=>value && value != 0);
  const genero = [
    { id: 0, type: '', name: 'Selecione una opcion' },
    { id: 1, type: 'M', name: 'Mujer' },
    { id: 2, type: 'H', name: 'Hombre' },
    { id: 3, type: 'PND', name: 'Prefiero no decirlo' }
  ];
  const dataR = emailinsti.data ? emailinsti?.data : null;
  const dataVC = verifycode.data ? verifycode?.data : null;

  //console.log(verifycode);

  //------------------
  //? Use Effects
  //-----------------
  // useEffect(()=>{
  //   const handler = setTimeout(()=>{
  //     //console.log(emailValue)
  //     if(emailValue.includes('@') && (emailValue.includes('.pe') || emailValue.includes('.com'))){
  //       dispath(ValidateEmailInsti(emailValue))
  //     }
  //   },400)
  //   return ()=>clearTimeout(handler);
  // }, [emailValue]);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      if(vcode.code.length === 6){
        dispath(VerifyCodeEmail(vcode))
      }
    },400);

    return ()=>clearTimeout(handler);
  },[vcode.code])

  useEffect(()=>{
    dispath(GetDepart())
  },[]);

  //-------------
  //? ARROW FUNCTION || FUNCTION
  //-------------

  const onSubmit = (data) => {
    console.log(data);
  };
  
  const ChangeOptionDepar = (value) => {
    dispath(FindProvi(value))
  };

  const ChangeOptionProvi = (value) => {
  dispath(FindDist(value))
  };

  const ValidateEmailInsti = (value) =>{
    if(value.includes('@') && (value.includes('.pe') || value.includes('.com'))){
      setEmailValue(value)
      dispath(ValidateEmailinstiThunk(value));
    }
  }

  const VerifyCodeEmail = (value) =>{
    value.email = emailValue;
    dispath(VerifyCodeEmailThunk(value))
  }

  //console.log(verifycode)

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
          {step === 1 && (
            <>
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
          <div className="mt-6 flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  //disabled={!watchFields}
                  className={!watchFields ? "bg-[#1785de8b] text-white px-4 py-2 rounded transition" : "bg-[#1785de] text-white px-4 py-2 rounded hover:bg-[#0e65b5] transition"}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>

          <div className="mb-4 relative">
            <label htmlFor="email">Correo Institucional</label>

            {/* Tooltip activado SOLO cuando el mouse está sobre el botón "i" */}
            <div className="absolute top-0 right-0 mt-1 mr-1">
              <div className="relative">
                <div className="group w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold cursor-pointer">
                  i
                  {/* Este tooltip está DENTRO del botón "i", y depende del hover del ícono */}
                  <div className="absolute right-6 top-1 w-64 max-w-[90vw] p-2 text-xs text-white bg-gray-700 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    El correo institucional solo se usará para confirmar que eres estudiante de la UTP y no se guardará en nuestra base de datos.
                  </div>

                </div>
              </div>
            </div>

            <input
              id="email"
              type="email"
              placeholder="correo institucional"
              {...register("email", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              onChange={(e) =>ValidateEmailInsti(e.target.value)}
            />
            {(errors.email) && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            {dataR?.data?.success === true && (<p className="text-green-500 text-sm mt-1 flex items-center "> <FaCheck /> {dataR?.data?.message} </p>)}
            {dataR?.data?.success === false && (<p className="text-red-500 text-sm mt-1 flex items-center"> <RxCross2 /> {dataR?.data?.message} </p>)}
          </div>
            
            {dataR?.data?.success === true && (<div className=" mb-4">
            <label >
              Verifica el codigo
            </label>
            <input type="text" 
            //id="VCode" 
             placeholder="x-x-x-x-x-x-x-x" 
            //{...register("Vcode",{required})} 
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            onChange={(e)=>setVcode({...vcode, code:e.target.value})} />
            {dataVC?.data?.success === true && ( <p className="text-green-500 text-sm mt-1 flex items-center"> <FaCheck /> {dataVC?.data?.message} </p> )}
            {dataVC?.data?.success === false && ( <p className="text-red-500 text-sm mt-1 flex items-center"> <RxCross2 /> {dataVC?.data?.message} </p> )}
          </div>)}

          <div className=" mb-4">
            <label>
              Nombre de usuario <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              id="NameUser"
              placeholder="@example123"
              disabled={verifycode.status !== 'succeeded'}
              {...register("NameUser", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
          </div>

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
              disabled={verifycode.status !== 'succeeded'}
              {...register("password", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-6 mb-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Atrás
                </button>

                <button
                  type="submit"
                  className="bg-[#1785de] text-white px-4 py-2 rounded hover:bg-[#0e65b5] transition"
                >
                  Registrar
                </button>
              </div>
            </>
          )}

          {step === 1 && (
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
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;