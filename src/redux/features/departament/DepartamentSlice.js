import { createSlice } from "@reduxjs/toolkit";
import { GetDepart } from "./Thunk/DeparThunk";

const DepartamentSlice = createSlice({
  name: "Departament",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDepart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetDepart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(GetDepart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export default DepartamentSlice.reducer;
