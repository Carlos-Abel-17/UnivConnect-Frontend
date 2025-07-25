import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "./Thunk/LoginThunk";



const LoginSlice = createSlice({
    name:'login',
    initialState:{
        LoginUserState:{
            data:null,
            status:'idle',
            error:null
        }
    },
    reducers:{},
    extraReducers:((builder)=>{
        builder
        .addCase(LoginUser.pending,(state)=>{
            state.LoginUserState.status = 'loading'
        })
        .addCase(LoginUser.fulfilled,(state, action)=>{
            state.LoginUserState.status = 'succeeded';
            state.LoginUserState.data = action.payload;
        })
        .addCase(LoginUser.rejected, (state,action)=>{
            state.LoginUserState.status = 'failed';
            state.LoginUserState.error = action.error.message
        })
    })
})

export default LoginSlice.reducer;