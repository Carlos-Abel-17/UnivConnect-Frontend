import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FindDist = createAsyncThunk(
    'district/FindDist',
    async(id)=>{
        const response = await axios.get(`http://localhost:3017/district/${id}`);
        return response.data;
    }
)