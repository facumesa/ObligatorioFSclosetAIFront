
import { createSlice } from "@reduxjs/toolkit";

const ubicacionGuardada = localStorage.getItem("ubicacionClima");

let ubicacionInicial = {
    ciudad: "Montevideo",
    pais: "UY"
};

if (ubicacionGuardada) {
    try {
        const datos = JSON.parse(ubicacionGuardada);

        if (datos.ciudad && datos.pais) {
            ubicacionInicial = datos;
        }
    } catch (error) {
        console.error("Error al recuperar la ubicación:", error);
    }
}

const recomendacionesSlice = createSlice({
    name: "recomendaciones",

    initialState: {
        recomendacion: "",
        cargado: false,
        ubicacion: ubicacionInicial,
        clima: null,
        climaCargado: false
    },

    reducers: {
        guardarRecomendacion: (state, action) => {
            state.recomendacion = action.payload;
            state.cargado = true;
        },
        guardarClima: (state, action) => {
            state.clima = action.payload;
            state.climaCargado = true;
        },

        actualizarUbicacion: (state, action) => {
            state.ubicacion = action.payload;
            state.recomendacion = "";
            state.cargado = false;
            state.clima = null;
            state.climaCargado = false;
        },

        limpiarRecomendaciones: (state) => {
            state.recomendacion = "";
            state.cargado = false;
            state.ubicacion = {
                ciudad: "Montevideo",
                pais: "UY"
            };
            state.clima = null;
            state.climaCargado = false;
        }
    }
});

export const {
    guardarRecomendacion,
    actualizarUbicacion,
    limpiarRecomendaciones,
    guardarClima
} = recomendacionesSlice.actions;

export default recomendacionesSlice.reducer;
