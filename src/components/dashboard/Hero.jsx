import { useNavigate } from "react-router";
import ClimaCard from "./ClimaCard";

const Hero = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="hero-copy">
                <div className="eyebrow">TU ESTILO, TODOS LOS DÍAS</div>
                <h2>Vestirte bien empieza<br />en tu armario.</h2>
                <p>Organizá tus prendas, creá combinaciones y encontrá inspiración para cada ocasión.</p><button
                    className="pill-button" onClick={() => { navigate("/crear-outfit") }}>+ Crear nuevo outfit</button>
            </div>
            <div className="hero-visual">
                <ClimaCard />
            </div>
        </>
    )
}

export default Hero;