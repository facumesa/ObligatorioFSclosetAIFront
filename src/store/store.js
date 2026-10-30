import { configureStore } from '@reduxjs/toolkit';
import contadorSlice from './slices/contadorSlice';
import authReducer from './slices/authSlice';


export const store = configureStore({
    reducer: {
        auth : authReducer,
        contador: contadorSlice
    }
})