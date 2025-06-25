import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FindProvi = createAsyncThunk(
    'province/FindProvi', async (id)=>{
        const response = await axios.get(`http://localhost:3017/province/${id}`)
        return response.data;
    }
)