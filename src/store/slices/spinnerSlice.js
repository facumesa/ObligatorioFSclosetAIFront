import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cargando: false
}

export const spinnerSlice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
        mostrarSpinner: state => { 
            state.cargando = true;
        },
        ocultarSpinner: state => {
            state.cargando = false;
        },
    }
})

export const { mostrarSpinner, ocultarSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;