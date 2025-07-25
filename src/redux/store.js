import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/UserSlice"
import DepartamentSlice from './features/departament/DepartamentSlice';
import ProvinceSlice from './features/province/ProvinceSlice';
import DistrictSlice from './features/district/DistrictSlice';
import EmailInstiSlice from './features/emailinsti/emailinstiSlice';
import LoginSlice from './features/auth/LoginSlice';

export const store = configureStore({
    reducer:{
        UserR:userReducer,
        Depart:DepartamentSlice,
        Provi:ProvinceSlice,
        Dist:DistrictSlice,
        EmailInsti:EmailInstiSlice,
        LoginState:LoginSlice
    }
})