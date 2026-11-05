import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import prendasReducer from './slices/prendasSlice'
import categoriasReducer from "./slices/categoriasSlice";
import spinnerReducer from './slices/spinnerSlice';



export const store = configureStore({
    reducer: {
        auth : authReducer,
        prendas: prendasReducer,
        categorias: categoriasReducer,
        spinner: spinnerReducer
    }
})