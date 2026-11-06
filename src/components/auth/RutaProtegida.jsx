import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { tokenExpirado } from "../../utils/tokenUtils";
import { cerrarSesion } from "../../store/slices/authSlice";
import { limpiarPrendas } from "../../store/slices/prendasSlice";
import { limpiarCategorias } from "../../store/slices/categoriasSlice";
import { limpiarOutfits } from "../../store/slices/outfitsSlice";

const RutaProtegida = ({ children, soloAdmin = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const usuario = useSelector((state) => state.auth.usuario);

    const sesionInvalida = !token || !usuario || tokenExpirado(token);
    const esAdmin = usuario?.rol?.toLowerCase() === "administrador";

    useEffect(() => {
        if (sesionInvalida) {
            dispatch(cerrarSesion());
            dispatch(limpiarPrendas());
            dispatch(limpiarCategorias());
            dispatch(limpiarOutfits());

            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            navigate("/login", { replace: true });
        } else if (soloAdmin && !esAdmin) {
            navigate("/dashboard", { replace: true });
        }
    }, [sesionInvalida, dispatch, navigate, soloAdmin, esAdmin,]);

    if (sesionInvalida) {
        return null;
    }

    if (soloAdmin && !esAdmin) {
        return null;
    }

    return children;
};

export default RutaProtegida;