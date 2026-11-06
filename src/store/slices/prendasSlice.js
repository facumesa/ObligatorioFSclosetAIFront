
import { createSlice } from "@reduxjs/toolkit";

const prendasSlice = createSlice({
    name: "prendas",

    initialState: {
        lista: [],
        cargado: false
    },

    reducers: {
        guardarPrendas: (state, action) => {
            state.lista = action.payload;
            state.cargado = true;
        },

        agregarPrenda: (state, action) => {
            state.lista.push(action.payload);
        },

        actualizarPrenda: (state, action) => {
            const indice = state.lista.findIndex(
                (prenda) => prenda._id === action.payload._id
            );

            if (indice !== -1) {
                state.lista[indice] = action.payload;
            }
        },

        eliminarPrenda: (state, action) => {
            state.lista = state.lista.filter(
                (prenda) => prenda._id !== action.payload
            );
        },

        limpiarPrendas: (state) => {
            state.lista = [];
            state.cargado = false;
        }
    }
});

export const {
    guardarPrendas,
    agregarPrenda,
    actualizarPrenda,
    eliminarPrenda,
    limpiarPrendas
} = prendasSlice.actions;

export default prendasSlice.reducer;
