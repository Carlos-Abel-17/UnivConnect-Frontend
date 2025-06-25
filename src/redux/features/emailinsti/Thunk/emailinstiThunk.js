import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ValidateEmailinstiThunk = createAsyncThunk(
    'emailinsti/ValidateEmailinsti',
    async (email)=>{
        console.log(email)
        const response = await axios.get(`http://localhost:3017/emailinsti/@${email}`);
        return response.data;
    }
)