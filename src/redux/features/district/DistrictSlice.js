import { createSlice } from "@reduxjs/toolkit";
import { FindDist } from "./Thunk/DistThunk";

const DistrictSlice = createSlice({
    name:'district',
    initialState:{
        data:null,
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(FindDist.pending, (state) => {
        state.status = "loading";
        })
        .addCase(FindDist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        })
        .addCase(FindDist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error desconocido";
        });
    },
});

export default DistrictSlice.reducer;