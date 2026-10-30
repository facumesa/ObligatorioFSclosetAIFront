import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/dashboard">
        <span className="brand-mark">✦</span>
        closet<span>ai</span>
      </NavLink>

      <div>
        <div className="nav-label">MI ESPACIO</div>

        <nav className="nav">
          <NavLink to="">
            <span className="symbol">⌂</span> Inicio
          </NavLink>

          <NavLink to="">
            <span className="symbol">◈</span> Mis outfits
          </NavLink>

          <NavLink to="">
            <span className="symbol">▦</span> Mi armario
          </NavLink>

          <NavLink to="">
            <span className="symbol">✧</span> Recomendaciones IA
          </NavLink>

          <NavLink to="">
            <span className="symbol">♧</span> Mi plan
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <h3>✦ Tu estilo, sin límites</h3>
        <p>Descubrí más combinaciones y organizá todos tus outfits.</p>
        <button className="pill-button">
          Explorar Premium
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;