const Sidebar = () => {

    return (
        <>
            <a className="brand" href="dashboard.html"><span className="brand-mark">✦</span>closet<span>ai</span></a>
            <div>
                <div className="nav-label">MI ESPACIO</div>
                <nav className="nav"><a className="active" href="dashboard.html"><span className="symbol">⌂</span> Inicio</a><a
                    href="#outfits"><span className="symbol">◈</span> Mis outfits</a><a href="#armario"><span
                        className="symbol">▦</span> Mi armario</a><a href="#ia"><span className="symbol">✧</span>
                        Recomendaciones IA</a><a href="#plan"><span className="symbol">♧</span> Mi plan</a></nav>
            </div>
            <div className="sidebar-bottom">
                <h3>✦ Tu estilo, sin límites</h3>
                <p>Descubrí más combinaciones y organizá todos tus outfits.</p><button className="pill-button">Explorar
                    Premium</button>
            </div>
        </>
    )
}

export default Sidebar;