import { NavLink } from "react-router";


const SectionHead = () => {
    return (
        <div className="section-head">
            <h2>Mis últimos outfits</h2><NavLink to="/misoutfits"><span>Ver todos →</span></NavLink>
        </div>
    )
}

export default SectionHead;