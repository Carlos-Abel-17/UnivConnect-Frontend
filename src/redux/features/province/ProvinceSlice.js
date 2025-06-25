import { createSlice } from "@reduxjs/toolkit";
import { FindProvi } from "./Thunk/ProviThunk";

const ProvinceSlice = createSlice({
    name:'province',
    initialState:{
        data:null,
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(FindProvi.pending, (state) => {
            state.status = "loading";
          })
          .addCase(FindProvi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
          })
          .addCase(FindProvi.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Error desconocido";
          });
      },
});

export  default ProvinceSlice.reducer;