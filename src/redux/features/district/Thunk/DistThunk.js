import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FindDist = createAsyncThunk(
    'district/FindDist',
    async(id)=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/district/${id}`);
        return response.data;
    }
)