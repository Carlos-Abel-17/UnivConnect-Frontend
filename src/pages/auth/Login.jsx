import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import socialImg from "../../assets/img/social_img.svg";
import paper_logo from "../../../public/paper_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/features/auth/Thunk/LoginThunk";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";


function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data, status, error} = useSelector((state)=>state.LoginState.LoginUserState);

  const onSubmit = (data) => {
    //console.log(data);
    dispatch(LoginUser(data));
  };

  useEffect( ()=>
  {
    console.log(data)
    if(status === "succeeded" && data){
      //console.log('se logro hacer el login', data)
      const ObtenerToken = localStorage.getItem('Tokensecret')
      if(ObtenerToken){
        const decode = jwtDecode(ObtenerToken);
        console.log(decode)
      }
      navigate('/')
    }else if (status === "failed") {
      console.log("Error al iniciar sesión:", error);
    }
  },[status])

  return (
    <div className="flex w-full h-screen ">
      {/* //! Imagen lateral - solo visible en pantallas md+ */}
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
            Iniciar Sesión
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Correo Institucional
            </label>
            <input
              id="email"
              type="email"
              placeholder="telefono, usuario o correo institu..."
              {...register("email", { required: "Este campo es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              {...register("password", { required: "Este campo es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1785de]"
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
            Iniciar Sesión
          </button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              ¿No tienes cuenta?
              <Link to="/auth/Register">
                <span className="text-[#1785de] font-medium hover:underline ml-1">
                  Crea una
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
