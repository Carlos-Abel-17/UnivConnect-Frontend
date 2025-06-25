import { createSlice } from "@reduxjs/toolkit";
import { ValidateEmailinstiThunk } from "./Thunk/emailinstiThunk";

const Emailinsti = createSlice({
    name:'emailinsti', 
    initialState:{
        data:null,
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ValidateEmailinstiThunk.pending,(state)=>{
            state.status = 'loanding'
        })
        .addCase(ValidateEmailinstiThunk.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(ValidateEmailinstiThunk.rejected,(state, action)=>{
            state.status = 'failed';
            state.error =action.error.message;
        })
    }
})

export default Emailinsti.reducer;