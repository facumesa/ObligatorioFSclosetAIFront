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

        limpiarPrendas: (state) => {
            state.lista = [];
            state.cargado = false;
        }
    }
});

export const { guardarPrendas, limpiarPrendas } = prendasSlice.actions;

export default prendasSlice.reducer;