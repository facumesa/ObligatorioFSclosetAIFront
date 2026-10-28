import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuenta: 0
}

export const contadorSlice = createSlice({
    name: "contador",
    initialState,
    reducers: {
        incrementar: state => {
            state.cuenta++;
        },
        decrementar: state => {
            state.cuenta--;
        },
        resetear: state => {
            state.cuenta = 0;
        }

    }
})

export const { incrementar, decrementar, resetear } = contadorSlice.actions;
export default contadorSlice.reducer;