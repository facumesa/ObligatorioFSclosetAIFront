import { createSlice } from '@reduxjs/toolkit';

const usuarioGuardado = JSON.parse(localStorage.getItem("usuario") || "null");
const tokenGuardado = localStorage.getItem("token");

const initialState = {
    usuario: usuarioGuardado,
    token: tokenGuardado,
    autenticado: !!tokenGuardado
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        iniciarSesion: (state, action) => {
            state.usuario = action.payload.usuario;
            state.token = action.payload.token;
            state.autenticado = true;
        },

        cerrarSesion: (state) => {
            state.usuario = null;
            state.token = null;
            state.autenticado = false;
        },
        actualizarPlan: (state, action) => {
            if (state.usuario) {
                state.usuario.plan = action.payload;
            }
        }
    }
});

export const { iniciarSesion, cerrarSesion, actualizarPlan } = authSlice.actions;

export default authSlice.reducer;