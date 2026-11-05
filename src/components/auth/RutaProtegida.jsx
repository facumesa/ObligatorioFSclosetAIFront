import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { tokenExpirado } from "../../utils/tokenUtils";
import { cerrarSesion } from "../../store/slices/authSlice";
import { limpiarPrendas } from "../../store/slices/prendasSlice";
import { limpiarCategorias } from "../../store/slices/categoriasSlice";

const RutaProtegida = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    const sesionInvalida = !token || !usuario || tokenExpirado(token);

    useEffect(() => {
        if (sesionInvalida) {
            dispatch(cerrarSesion());
            dispatch(limpiarPrendas());
            dispatch(limpiarCategorias());

            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            navigate("/login", { replace: true });
        }
    }, [sesionInvalida, dispatch, navigate]);

    if (sesionInvalida) {
        return null;
    }

    return children;
};

export default RutaProtegida;