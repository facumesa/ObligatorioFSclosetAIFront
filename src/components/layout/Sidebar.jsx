
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { useState } from "react";
import { actualizarPlan } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const usuario = useSelector((state) => state.auth.usuario);
  const esPlus = usuario?.plan?.toLowerCase() === "plus";
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [cambiandoPlan, setCambiandoPlan] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  const cambiarAPremium = async () => {
    if (cambiandoPlan || !esPlus || !token) return;

    setCambiandoPlan(true);

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/users/cambioPlan`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.message || "No se pudo cambiar el plan"
        );
      }

      dispatch(actualizarPlan("Premium"));

      const usuarioActualizado = {
        ...usuario,
        plan: "Premium"
      };

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioActualizado)
      );

      toast.success("¡Ahora tenés el plan Premium!");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setCambiandoPlan(false);
    }
  };

  return (
    <>
      {/* BOTÓN PARA ABRIR EL MENÚ EN CELULARES */}
      {!menuAbierto && (
        <button
          type="button"
          className="sidebar-mobile-toggle"
          onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú"
          aria-expanded={false}
          aria-controls="sidebar-principal"
        >
          ☰
        </button>
      )}

      {/* FONDO OSCURO AL ABRIR EL MENÚ */}
      {menuAbierto && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        id="sidebar-principal"
        className={`sidebar ${menuAbierto ? "sidebar-abierto" : ""}`}
      >
        <div className="sidebar-header">
          <NavLink
            className="brand"
            to="/dashboard"
            onClick={cerrarMenu}
          >
            <span className="brand-mark">✦</span>
            closet<span>ai</span>
          </NavLink>

          <button
            type="button"
            className="sidebar-close"
            onClick={cerrarMenu}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>

        <div>
          <div className="nav-label">MI ESPACIO</div>

          <nav className="nav">
            <NavLink to="/dashboard" onClick={cerrarMenu}>
              <span className="symbol">⌂</span> Inicio
            </NavLink>

            <NavLink to="/misoutfits" onClick={cerrarMenu}>
              <span className="symbol">◈</span> Mis outfits
            </NavLink>

            <NavLink to="/mi-armario" onClick={cerrarMenu}>
              <span className="symbol">▦</span> Mi armario
            </NavLink>

            <NavLink to="/recomendaciones" onClick={cerrarMenu}>
              <span className="symbol">✧</span> Recomendaciones IA
            </NavLink>
          </nav>
        </div>

        {esPlus && (
          <div className="sidebar-bottom">
            <h3>✦ Tu estilo, sin límites</h3>
            <p>
              Descubrí más combinaciones y organizá todos tus outfits.
            </p>

            <button
              type="button"
              className="pill-button"
              onClick={cambiarAPremium}
              disabled={cambiandoPlan}
            >
              {cambiandoPlan
                ? "Cambiando..."
                : "Cambiate a Premium"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
