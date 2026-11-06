import { createSlice } from "@reduxjs/toolkit";

const outfitsSlice = createSlice({
  name: "outfits",

  initialState: {
    lista: [],
    pagina: 1,
    totalPaginas: 1,
    cargado: false,
    consultaCargada: null,

    dashboard: {
      lista: [],
      total: 0,
      cargado: false,
    },
  },

  reducers: {
    guardarOutfits: (state, action) => {
      state.lista = action.payload.data;
      state.pagina = action.payload.page;
      state.totalPaginas = action.payload.totalPages;
      state.cargado = true;
      state.consultaCargada = action.payload.consulta;
    },

    guardarDashboardOutfits: (state, action) => {
      state.dashboard.lista = action.payload.data;
      state.dashboard.total = action.payload.total;
      state.dashboard.cargado = true;
    },

    actualizarOutfit: (state, action) => {
      const indice = state.lista.findIndex(
        (outfit) => outfit._id === action.payload._id,
      );
      state.dashboard.cargado = false;

      if (indice !== -1) {
        state.lista[indice] = action.payload;
      }
    },

    eliminarOutfit: (state, action) => {
      state.lista = state.lista.filter(
        (outfit) => outfit._id !== action.payload,
      );
      state.dashboard.cargado = false;
    },
    invalidarOutfits: (state) => {
      state.cargado = false;
      state.consultaCargada = null;
      state.dashboard.cargado = false;
    },

    limpiarOutfits: (state) => {
      state.lista = [];
      state.pagina = 1;
      state.totalPaginas = 1;
      state.cargado = false;
      state.consultaCargada = null;
      state.dashboard = {
        lista: [],
        total: 0,
        cargado: false,
      };
    },
  },
});

export const {
  guardarOutfits,
  actualizarOutfit,
  eliminarOutfit,
  limpiarOutfits,
  invalidarOutfits,
  guardarDashboardOutfits
} = outfitsSlice.actions;

export default outfitsSlice.reducer;
