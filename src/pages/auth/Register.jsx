import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import socialImg from "../../assets/img/social_img.svg";
import paper_logo from "../../../public/paper_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { GetDepart } from "../../redux/features/departament/Thunk/DeparThunk";
import { FindProvi } from "../../redux/features/province/Thunk/ProviThunk";
import { FindDist } from "../../redux/features/district/Thunk/DistThunk";
import { ValidateEmailinstiThunk, VerifyCodeEmailThunk } from "../../redux/features/emailinsti/Thunk/emailinstiThunk";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { debounce } from "lodash";
import { CreateUser, VerifyNameUser } from "../../redux/features/User/Thunk/UserThunk";
import LoadingLine from "../../utils/loading_line";

function Register() {
  //-------------------
  //? UseSelectors
  //-------------------
  const depart = useSelector((state)=>state.Depart);
  const provi = useSelector((state)=>state.Provi);
  const dist = useSelector((state)=>state.Dist);
  const emailinsti = useSelector((state)=>state.EmailInsti.validate);
  const verifycode = useSelector((state)=>state.EmailInsti.verify);
  const verifyNameUserState =useSelector((state)=>state.UserR.VerifyNameUser);
  const CreateUserState = useSelector((state)=> state.UserR.CreateUserState);
  //------------------
  //?UseState
  //-----------------
  const [nameUser, setNameUser] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [step,setStep] = useState(1);
  const [vcode, setVcode] = useState({email:'',code:''});
  const [edad,setEdad] = useState(null);
    //-------------------
  //? VARIABLES
  //-------------------
  const dispath = useDispatch();
  const {register, handleSubmit, formState: { errors }, watch,setValue} = useForm();
  const watchFields = watch(["Name", "LastName", "Birthdate", "Gender", "Departament", "Province", "District"]).every(value=>value && value != 0);
  const WatchBirthdate = watch('Birthdate');
  const genero = [
    { id: 0, type: '', name: 'Selecione una opcion' },
    { id: 1, type: 'M', name: 'Mujer' },
    { id: 2, type: 'H', name: 'Hombre' },
    { id: 3, type: 'PND', name: 'Prefiero no decirlo' }
  ];
  const dataR = emailinsti.data ? emailinsti?.data : null;
  const dataVC = verifycode.data ? verifycode?.data : null;
  const dataVNU = verifyNameUserState.data ? verifyNameUserState?.data : null;
  //-------------------
  //? UseEffects
  //-------------------
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

  useEffect(()=>{
    if(WatchBirthdate){
      //console.log(WatchBirthdate)
      const today = new Date();
      const birth = new Date(WatchBirthdate);
      
      //console.log(birth.getFullYear())
      let age = today.getFullYear() - birth.getFullYear();
      const  m = today.getMonth() - birth.getMonth();

      if(m < 0 || (m === 0 && today.getDate() < birth.getDate())){
        age--;
      }
      setEdad(age);
    }
  },[WatchBirthdate]);
  //-------------
  //? ARROW FUNCTION || FUNCTION
  //-------------

  const onSubmit = (data) => {
    //console.log(dataR.data.data.dataInsti);
    const transforData = {
      ...data, Gender:Number(data.Gender),
      Province:Number(data.Province),
      District:Number(data.District),
      Departament:Number(data.Departament),
      PasswordView:data.Password,
      Number:data.Number.length >= 9 ? data.Number : 900000099,
      idInstitucion: dataR?.data ? dataR.data.data.dataInsti.idInstitucion : null
    };
    //console.log(transforData)
    dispath(CreateUser(transforData));
    //console.log(CreateUserState);
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
      //console.log(emailinsti)
    }
  }

 const handleNameUserChange = useCallback(
  debounce((value)=>{
    if(value.length >= 8){
      dispath(VerifyNameUser(value))
    } 
  },500),
  []
 )

 const onChangeNameUser = (e) =>{
  const value = e.target.value;
  setNameUser(value)
  handleNameUserChange(value)
  console.log(verifyNameUserState);
 }

  const VerifyCodeEmail = (value) =>{
    value.email = emailValue;
    dispath(VerifyCodeEmailThunk(value))
  }

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
              {...register("Birthdate", { required: "Este campo es obligatorio",validate: () => edad >= 17})}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
            {edad !== null && edad < 17 && <p style={{color: "red"}}>La edad mínima es de 17 años</p>}

          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Género */}
            <div>
              <label htmlFor="Gender">Género</label>
              <select
                id="Gender"
                {...register("Gender", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              >
                {genero.map((par) => (
                  <option key={par.id} value={par.id}>
                    {par.name}
                  </option>
                ))}
              </select>
              {errors.Gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Gender.message}
                </p>
              )}
            </div>

            {/* Departament */}
            <div>
              <label htmlFor="Departament">Departamento</label>
              <select
                id="Departament"
                {...register("Departament", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
                onChange={(e)=>ChangeOptionDepar(e.target.value)}
              >
                <option value="0">Seleccione un departamento</option>
                {depart.data?.map((par)=>(
                 <option key={par.id} value={par.id}>{par.nameDepar}</option>
                ))}
              </select>
              {errors.Departament && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Departament.message}
                </p>
              )}
            </div>

            {/* Provincia */}
            <div>
              <label htmlFor="Province">Provincia</label>
              <select
                id="Province"
                {...register("Province", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
                onChange={(e)=>ChangeOptionProvi(e.target.value)}
              >
                <option value="0" >Seleccione una provincia</option>
                {provi.data?.map((par)=>(
                  <option key={par.id} value={par.id}>{par.name}</option>
                ))}
              </select>
              {errors.Province && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Province.message}
                </p>
              )}
            </div>

            {/* Distrito */}
            <div>
              <label htmlFor="District">Distrito</label>
              <select
                id="District"
                {...register("District", { required: "Este campo es obligatorio" })}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              >
                <option value="">Seleccione un distrito</option>
                {dist.data?.map((par)=>(
                  <option key={par.id} value={par.id}>{par.name}</option>
                ))}
              </select>
              {errors.District && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.District.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!watchFields || (edad !== null && edad < 17 )}
                  className={!watchFields || (edad !== null && edad < 17 ) ? "bg-[#1785de8b] text-white px-4 py-2 rounded transition" : "bg-[#1785de] text-white px-4 py-2 rounded hover:bg-[#0e65b5] transition"}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>

          <div className="mb-4 relative">
            <label htmlFor="Email">Correo Institucional</label>

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
              id="Email"
              type="Email"
              placeholder="correo institucional"
              {...register("Email", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              onChange={(e) =>ValidateEmailInsti(e.target.value)}
            />
            {emailinsti.status === 'loading' &&
            <LoadingLine />
            }
            {(errors.Email) && (
              <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
            )}
            {dataR?.data?.success === true && (<p className="text-[#0071e2] text-sm mt-1 flex items-center "> <FaCheck /> {dataR?.data?.message} </p>)}
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
            {verifycode.status === 'loading' &&
            <LoadingLine />
            }
            {dataVC?.data?.success === true && ( <p className="text-[#0071e2] text-sm mt-1 flex items-center"> <FaCheck /> {dataVC?.data?.message} </p> )}
            {dataVC?.data?.success === false && ( <p className="text-red-500 text-sm mt-1 flex items-center"> <RxCross2 /> {dataVC?.data?.message} </p> )}
          </div>)}

          <div className=" mb-4">
            <label>
              Numero de telefono <span className="text-red-600">(opcional)</span>
            </label>
            <input
              type="text"
              placeholder="+51 900 000 099"
              name="Number"
              {...register("Number")}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
          </div>

          <div className=" mb-4">
            <label>
              Nombre de usuario <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              placeholder="@example123"
              name="Name_User"
              disabled={verifycode.status !== 'succeeded'}
              {...register("Name_User", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
              onChange={onChangeNameUser}
              value={nameUser}
            />
            {verifyNameUserState.status === 'loading' &&
            <LoadingLine />
            }
            {dataVNU?.data?.flag === 1 && (<p className="text-[#0071e2] text-sm mt-1 flex items-center "> <FaCheck /> {dataVNU?.data?.message} </p>)}
            {dataVNU?.data?.flag === 0 && (<p className="text-red-500 text-sm mt-1 flex items-center"> <RxCross2 /> {dataVNU?.data?.message} </p>)}
          </div>

          <div className="mb-6">
            <label
              htmlFor="Password"
            >
              Contraseña
            </label>
            <input
              id="Password"
              type="Password"
              placeholder="********"
              disabled={verifycode.status !== 'succeeded'}
              {...register("Password", { required: "Este campo es obligatorio" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
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