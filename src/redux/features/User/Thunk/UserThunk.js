import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUserById = createAsyncThunk(
    'user/FetchUserById',
    async (id)=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/users/${id}`);
        console.log(response);
        return response.data;
    }
)

export const VerifyNameUser =createAsyncThunk(
    'user/VerifyNameUser',
    async (Name_User)=>{
        const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/users/verifyNameUser/`,{Name_User});
        console.log(response);
        return {
            data:response.data,
            status:response.status,
            message:response.data.message
        };
    }
) 

export const CreateUser = createAsyncThunk(
    'user/CreateUser',
    async (user)=>{
        const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/users/createUsers`,{user});
        console.log(response);
        return
    }
)