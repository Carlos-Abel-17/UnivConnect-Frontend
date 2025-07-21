import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetDepart = createAsyncThunk(
    'departament/GetDepart',
    async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/departament`);
        console.log(response)
        return response.data;
    }
)