import { createSlice } from "@reduxjs/toolkit";
import { FetchUserById } from "./Thunk/UserThunk";

const UserSlice = createSlice({
    name:'user', 
    initialState:{
        data:null,
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchUserById.pending,(state)=>{
            state.status = 'loanding'
        })
        .addCase(FetchUserById.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(FetchUserById.rejected,(state, action)=>{
            state.status = 'failed';
            state.error =action.error.message;
        })
    }
})

export default UserSlice.reducer;