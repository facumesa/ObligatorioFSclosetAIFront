import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cerrarSesion } from "../../store/slices/authSlice";

const DashboardHeader = () => {

    const usuario = useSelector((state) => state.auth.usuario);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const salir = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        dispatch(cerrarSesion());
        navigate("/login", { replace: true });
    };

    return (
        <header className="topbar">
            <div>
                <div className="eyebrow">TU ARMARIO DIGITAL</div>
                <h1>¡Buen día {usuario?.name}! ✨</h1>
            </div>

            <div className="profile-container">
                <button
                    type="button"
                    className="profile"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-expanded={menuAbierto}
                >
                    <div className="name">
                        <strong style={{ fontSize: "12px" }}>Mi perfil</strong>
                        <br />
                        <small>Plan {usuario?.plan || "Free"}</small>
                    </div>

                    <div className="avatar">
                        {usuario?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                </button>

                {menuAbierto && (
                    <div className="profile-dropdown">
                        <div className="profile-dropdown-info">
                            <strong>{usuario?.name}</strong>
                            <small>{usuario?.email}</small>
                        </div>

                        <button
                            type="button"
                            className="profile-logout"
                            onClick={salir}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default DashboardHeader;