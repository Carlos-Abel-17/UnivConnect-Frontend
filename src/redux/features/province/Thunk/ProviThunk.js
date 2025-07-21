import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FindProvi = createAsyncThunk(
    'province/FindProvi', async (id)=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND_LOCAL}/province/${id}`)
        return response.data;
    }
)