import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUserById = createAsyncThunk(
    'user/FetchUserById',
    async (id)=>{
        const response = await axios.get(`http://localhost:3017/users/${id}`);
        return response.data;
    }
)