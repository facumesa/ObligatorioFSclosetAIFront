
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

        agregarCategoria: (state, action) => {
            state.lista.push(action.payload);
        },

        actualizarCategoria: (state, action) => {
            const indice = state.lista.findIndex(
                (categoria) => categoria._id === action.payload._id
            );

            if (indice !== -1) {
                state.lista[indice] = action.payload;
            }
        },

        eliminarCategoria: (state, action) => {
            state.lista = state.lista.filter(
                (categoria) => categoria._id !== action.payload
            );
        },

        invalidarCategorias: (state) => {
            state.cargado = false;
        },

        limpiarCategorias: (state) => {
            state.lista = [];
            state.cargado = false;
        }
    }
});

export const {
    guardarCategorias,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria,
    invalidarCategorias,
    limpiarCategorias
} = categoriasSlice.actions;

export default categoriasSlice.reducer;
