import { createSlice } from "@reduxjs/toolkit";

const categoriasSlice = createSlice({
    name: "categorias",

    initialState: {
        lista: [],
        cargado: false
    },

    reducers: {
        guardarCategorias: (state, action) => {
            state.lista = action.payload;
            state.cargado = true;
        },

        limpiarCategorias: (state) => {
            state.lista = [];
            state.cargado = false;
        }
    }
});

export const {
    guardarCategorias,
    limpiarCategorias
} = categoriasSlice.actions;

export default categoriasSlice.reducer;