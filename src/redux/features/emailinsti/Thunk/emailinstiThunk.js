import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ValidateEmailinstiThunk = createAsyncThunk(
    'emailinsti/ValidateEmailinsti',
    async (email)=>{
        //console.log(email)
        const response = await axios.post(`http://localhost:3017/emailinsti/validate/`,{email:email});
        //console.log(response.data)
        return {
            data:response.data,
            status:response.success,
            message:response.message
        };
    }
);

export const VerifyCodeEmailThunk = createAsyncThunk(
    'emailinsti/VerifyCodeEmail',
    async (params)=>{
        //console.log(params)
        const response = await axios.post('http://localhost:3017/emailinsti/verify-code/',{params});
        //console.log(response)
        return {
            data:response.data,
            status:response.data.success,
            message:response.data.message
        };
    }
)