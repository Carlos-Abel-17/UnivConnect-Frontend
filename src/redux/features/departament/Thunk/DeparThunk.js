import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetDepart = createAsyncThunk(
    'departament/GetDepart',
    async ()=>{
        const response = await axios.get(`http://localhost:3017/departament`);
        return response.data;
    }
)