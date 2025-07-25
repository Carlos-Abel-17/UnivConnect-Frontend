import { createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "axios";


export const LoginUser = createAsyncThunk(
    'login/LoginUser',
    async (datosUser) => {
        const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/auth/Login`,{datosUser})
        console.log(response);
        if(response.status === 201){
            localStorage.setItem('Tokensecret',response.data.access_token)
        }
        return {
            data:response.data.access_token,
            status:response.data.status,
            message:response.data.message
        }
    }
)