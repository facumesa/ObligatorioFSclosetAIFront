
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { guardarRecomendacion } from "../../store/slices/recomendacionesSlice";
import { mostrarSpinner, ocultarSpinner } from "../../store/slices/spinnerSlice";
import { useNavigate } from "react-router";
import Spinner from "../spinner/Spinner";


const RecomendacionesIA = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const prendasDisponibles = useSelector(
        (state) => state.prendas.lista
    );

    const token = useSelector((state) => state.auth.token);

    const ubicacion = useSelector(
        (state) => state.recomendaciones.ubicacion
    );

    const recomendacion = useSelector(
        (state) => state.recomendaciones.recomendacion
    );

    const cargado = useSelector(
        (state) => state.recomendaciones.cargado
    );

    const [generando, setGenerando] = useState(false);
    const [error, setError] = useState("");
    const prendasRecomendadas = prendasDisponibles.filter(
        (prenda) => recomendacion?.prendas?.includes(prenda._id)
    );

    const generarRecomendacion = async () => {
        if (generando || !token) return;

        setGenerando(true);
        setError("");
        dispatch(mostrarSpinner());

        try {
            const respuesta = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/v1/recomendaciones`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        ciudad: ubicacion.ciudad,
                        pais: ubicacion.pais
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.message ||
                    "No se pudo generar la recomendación"
                );
            }

            if (
                !datos.recomendacion ||
                !datos.recomendacion.nombre ||
                !Array.isArray(datos.recomendacion.prendas) ||
                datos.recomendacion.prendas.length === 0
            ) {
                throw new Error("No se recibió una recomendación válida");
            }

            dispatch(guardarRecomendacion(datos.recomendacion));

            toast.success("Recomendación generada correctamente");

        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setGenerando(false);
            dispatch(ocultarSpinner());
        }
    };

    return (
        <main className="content recomendaciones-ia">
            <Spinner />
            <div className="mis-outfits-header">
                <div>
                    <span className="mis-outfits-eyebrow">
                        INTELIGENCIA ARTIFICIAL
                    </span>

                    <h1>Tu estilista personal</h1>

                    <p>
                        Descubrí nuevas combinaciones utilizando
                        las prendas de tu armario y el clima actual.
                    </p>
                </div>
            </div>

            <div className="recomendaciones-panel">

                <div className="recomendaciones-intro">
                    <span className="recomendaciones-icono">✦</span>

                    <h2>¿Qué me pongo hoy?</h2>

                    <p>
                        Gemini analizará tus prendas y el clima
                        para recomendarte un outfit.
                    </p>

                    <p className="recomendaciones-ubicacion">
                        Ubicación: {ubicacion.ciudad}, {ubicacion.pais}
                    </p>

                    <button
                        type="button"
                        className="pill-button"
                        onClick={generarRecomendacion}
                        disabled={generando}
                    >
                        {generando
                            ? "Generando recomendación..."
                            : "✦ Generar recomendación"}
                    </button>
                </div>

                {error && (
                    <p className="recomendaciones-error" role="alert">
                        {error}
                    </p>
                )}


                {cargado && recomendacion && (
                    <div className="recomendaciones-resultado">

                        <span className="mis-outfits-eyebrow">
                            TU RECOMENDACIÓN
                        </span>

                        <h2>{recomendacion.nombre}</h2>

                        <p>{recomendacion.descripcion}</p>

                        <p>
                            <strong>Temporada:</strong> {recomendacion.temporada}
                        </p>

                        <h3>Prendas recomendadas</h3>

                        <div className="recomendaciones-prendas">
                            {prendasRecomendadas.map((prenda) => (
                                <div
                                    className="recomendacion-prenda"
                                    key={prenda._id}
                                >
                                    {prenda.imagen ? (
                                        <img
                                            src={prenda.imagen}
                                            alt={prenda.nombre}
                                        />
                                    ) : (
                                        <div className="recomendacion-sin-imagen">
                                            Sin imagen
                                        </div>
                                    )}

                                    <strong>{prenda.nombre}</strong>
                                    <span>{prenda.tipo} · {prenda.color}</span>
                                </div>
                            ))}
                        </div>

                        <h3>¿Por qué esta combinación?</h3>
                        <p>{recomendacion.explicacion}</p>

                        <button
                            type="button"
                            className="pill-button"
                            onClick={() => navigate("/crear-outfit", {
                                state: {
                                    recomendacion
                                }
                            })}
                        >
                            + Crear outfit con esta recomendación
                        </button>

                    </div>
                )}


            </div>
        </main>
    );
};

export default RecomendacionesIA;
