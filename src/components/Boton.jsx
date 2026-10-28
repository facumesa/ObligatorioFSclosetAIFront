import { useDispatch } from "react-redux";
import { incrementar, decrementar, resetear } from "../store/slices/contadorSlice";

const Boton = () => {

    const dispatch = useDispatch();

    const aumentarCuenta = () => {
        console.log("click");
        dispatch(incrementar());
    }

    const decrementarCuenta = () => {
        dispatch(decrementar());
    }

    const resetearCuenta = () => {
        dispatch(resetear());
    }

    return (
        <div>
            <input type="button" value="Incrementar" onClick={aumentarCuenta} />
            <input type="button" value="Decrementar" onClick={decrementarCuenta} />
            <input type="button" value="Resetear" onClick={resetearCuenta} />
        </div>

    )
}

export default Boton