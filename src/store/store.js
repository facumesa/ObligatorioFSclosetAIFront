import { configureStore } from '@reduxjs/toolkit';
import contadorSlice from './slices/contadorSlice';


export const store = configureStore({
    reducer: {
        contador : contadorSlice
    }
})