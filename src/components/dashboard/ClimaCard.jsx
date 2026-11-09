
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actualizarUbicacion, guardarClima } from "../../store/slices/recomendacionesSlice";
import toast from "react-hot-toast";

const ClimaCard = () => {
    const token = useSelector((state) => state.auth.token);

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("UY");

    const dispatch = useDispatch();

    const ubicacion = useSelector(
        (state) => state.recomendaciones.ubicacion
    );

        const clima = useSelector(
        (state) => state.recomendaciones.clima
    );

    const climaCargado = useSelector(
        (state) => state.recomendaciones.climaCargado
    );

    useEffect(() => {
        if (!token || climaCargado) return;

        const cargarClima = async () => {
            setCargando(true);
            setError("");

            try {
                const respuesta = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/v1/clima?ciudad=${encodeURIComponent(ubicacion.ciudad)}&pais=${encodeURIComponent(ubicacion.pais)}`,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(
                        datos.message || "No se pudo obtener el clima"
                    );
                }

                dispatch(guardarClima(datos));

                localStorage.setItem(
                    "ubicacionClima",
                    JSON.stringify(ubicacion)
                );

            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        cargarClima();
    }, [token, ubicacion, climaCargado, dispatch]);

    const buscarCiudad = (e) => {
        e.preventDefault();

        if (!ciudad.trim() || !pais.trim()) {
            toast.error("Ingresá una ciudad y un país");
            return;
        }

        const nuevaUbicacion = {
            ciudad: ciudad.trim(),
            pais: pais.trim().toUpperCase()
        };

        dispatch(actualizarUbicacion(nuevaUbicacion));
    };

    return (
        <div className="clima-card">
            <div className="clima-card-header">
                <span>EL CLIMA DE HOY</span>
                <span className="clima-icono">☀</span>
            </div>

            {cargando || (!climaCargado && !error) ? (
                <p>Consultando el clima...</p>
            ) : error ? (
                <p>{error}</p>
            ) : clima ? (
                <>
                    <div className="clima-card-info">
                        <h2>{clima.temperatura}°C</h2>
                        <p>{clima.clima}</p>
                        <span>
                            {clima.ciudad}, {clima.pais}
                        </span>
                    </div>

                    <div className="clima-card-detalles">
                        <span>
                            Sensación {clima.sensacionTermica}°C
                        </span>
                        <span>
                            Lluvia {clima.precipitacion} mm
                        </span>
                    </div>
                </>
            ) : (
                <p>No hay información del clima disponible.</p>
            )}

            <div className="clima-ubicacion">
                <form onSubmit={buscarCiudad} className="clima-form">
                    <input
                        type="text"
                        placeholder="Ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="País"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        maxLength={2}
                    />

                    <button type="submit">
                        Cambiar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClimaCard;
