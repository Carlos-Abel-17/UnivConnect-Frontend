import { createSlice } from "@reduxjs/toolkit";
import { CreateUser, FetchUserById, VerifyNameUser } from "./Thunk/UserThunk";

const UserSlice = createSlice({
    name:'user', 
    initialState:{
        user:{
            data:null,
            status:'idle',
            error:null
        },
        VerifyNameUser:{
            data:null,
            status:'idle',
            error:null
        },
        CreateUserState:{
            data:null,
            status:'idle',
            error:null
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchUserById.pending,(state)=>{
            state.user.status = 'loading'
        })
        .addCase(FetchUserById.fulfilled,(state, action)=>{
            state.user.status = 'succeeded';
            state.user.data = action.payload;
        })
        .addCase(FetchUserById.rejected,(state, action)=>{
            state.user.status = 'failed';
            state.user.error = action.payload || action.error.message;
        })
        //--------------------
        //?VerifyNameUser
        //--------------------
        .addCase(VerifyNameUser.pending,(state)=>{
            state.VerifyNameUser.status = 'loading';
        })
        .addCase(VerifyNameUser.fulfilled,(state,action)=>{
            state.VerifyNameUser.status = 'succeded';
            state.VerifyNameUser.data = action.payload;
        })
        .addCase(VerifyNameUser.rejected,(state,action)=>{
            state.VerifyNameUser.status = 'failed';
            state.VerifyNameUser.error = action.payload || action.error.message;
        })
        //--------------------
        //?CreateUser
        //--------------------
        .addCase(CreateUser.pending,(state)=>{
            state.CreateUserState.status = 'loading';
        })
        .addCase(CreateUser.fulfilled,(state,action)=>{
            state.CreateUserState.status = 'succeded';
            state.CreateUserState.data = action.payload;
        })
        .addCase(CreateUser.rejected,(state,action)=>{
            state.CreateUserState.status = 'failed';
            state.CreateUserState.error = action.payload || action.error.message;
        })
    }
})

export default UserSlice.reducer;