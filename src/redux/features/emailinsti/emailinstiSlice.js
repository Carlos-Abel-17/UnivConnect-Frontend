import { createSlice } from "@reduxjs/toolkit";
import { ValidateEmailinstiThunk, VerifyCodeEmailThunk } from "./Thunk/emailinstiThunk";

const Emailinsti = createSlice({
    name:'emailinsti', 
    initialState:{
        validate:{
            data:null,
            status:'idle',
            error:null
        },
        verify:{
            data:null,
            status:'idle',
            error:null
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        
        //--------------------------------
        // ValidateEmailinstiThunk
        //--------------------------------
        builder
        .addCase(ValidateEmailinstiThunk.pending,(state)=>{
            state.validate.status = 'loading'
        })
        .addCase(ValidateEmailinstiThunk.fulfilled,(state, action)=>{
            state.validate.status = 'succeeded';
            state.validate.data = action.payload;
        })
        .addCase(ValidateEmailinstiThunk.rejected,(state, action)=>{
            state.validate.status = 'failed';
            state.validate.error = action.error.message;
        })

        //--------------------------------
        // VerifyCodeEmailThunk
        //--------------------------------

        .addCase(VerifyCodeEmailThunk.pending,(state)=>{
            state.verify.status = 'loading';
        })
        .addCase(VerifyCodeEmailThunk.fulfilled,(state,action)=>{
            state.verify.status = 'succeeded';
            state.verify.data = action.payload;
        })
        .addCase(VerifyCodeEmailThunk.rejected, (state,action)=>{
            state.verify.status = 'failed';
            state.verify.error = action.payload || action.error.message;
        })
    }
})

export default Emailinsti.reducer;