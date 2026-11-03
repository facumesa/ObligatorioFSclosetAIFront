import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


const MisOutfits = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("")

    const [outfits, setOutfits] = useState([])
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [temporada, setTemporada] = useState("");
    const [favorito, setFavorito] = useState("");

    const token = localStorage.getItem("token");

    const eliminarOutfit = async (id) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que querés eliminar este outfit?"
        );

        if (!confirmar) return;

        try {
            const respuesta = await fetch(
                `https://obligatorio-f-scloset-ai.vercel.app/v1/outfits/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token
                    }
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar el outfit");
            }

            alert("Outfit eliminado correctamente");

            setOutfits(outfits.filter((outfit) => outfit._id !== id));

        } catch (error) {
            setError(error.message);
        }
    };

    const cambiarFavorito = async (id, favoritoActual) => {
        try {
            const respuesta = await fetch(
                `https://obligatorio-f-scloset-ai.vercel.app/v1/outfits/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        favorito: !favoritoActual
                    })
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo actualizar el favorito");
            }

            setOutfits(
                outfits.map((outfit) => {
                    if (outfit._id === id) {
                        return {
                            ...outfit,
                            favorito: !favoritoActual
                        };
                    }

                    return outfit;
                })
            );

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const cargarOutfits = async () => {
            try {
                const respuesta = await fetch(
                    `https://obligatorio-f-scloset-ai.vercel.app/v1/outfits?page=${pagina}&limit=6&temporada=${temporada}&favorito=${favorito}`,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar los outfits");
                }

                const datos = await respuesta.json();

                setOutfits(datos.data);
                setTotalPaginas(datos.totalPages);

            } catch (error) {
                setError(error.message)
            }
        };

        cargarOutfits();
    }, [pagina, temporada, favorito, token])

    return (
        <main className="content mis-outfits">

            <div className="mis-outfits-header">
                <div>
                    <span className="mis-outfits-eyebrow">
                        MI VESTIDOR
                    </span>
                    <h1>Mis Outfits</h1>
                    <p>
                        Explorá, organizá y editá todas tus combinaciones.
                    </p>
                </div>

                <button
                    className="btn-nuevo-outfit"
                    onClick={() => navigate("/crear-outfit")}
                >
                    + Crear outfit
                </button>
            </div>

            <div className="mis-outfits-toolbar">
                <div className="mis-outfits-filters">
                    <select defaultValue=""
                        value={temporada}
                        onChange={(e) => {
                            setTemporada(e.target.value);
                            setPagina(1);
                        }}>
                        <option value="">Todas las temporadas</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                        <option value="Cualquiera">Cualquiera</option>
                    </select>

                    <select defaultValue=""
                        value={favorito}
                        onChange={(e) => {
                            setFavorito(e.target.value);
                            setPagina(1);
                        }}>
                        <option value="">Todos los outfits</option>
                        <option value="true">Favoritos</option>
                    </select>
                </div>
            </div>

            <div className="mis-outfits-results">
                <h2>Tu colección</h2>
                <span>Todos tus looks en un solo lugar</span>
            </div>

            {outfits.length === 0 ? (
                <div className="empty-outfits">
                    <h3>Todavía no tenés outfits creados</h3>
                    <p>Comenzá creando tu primera combinación.</p>
                </div>
            ) : (
                <div className="mis-outfits-grid">
                    {outfits.map((outfit) => (
                        <article className="mis-outfit-card" key={outfit._id}>
                            <div className="mis-outfit-image">
                                <span className="mis-outfit-category">
                                    {outfit.categoriaId?.nombre}
                                </span>

                                <button
                                    type="button"
                                    className="mis-outfit-favorite"
                                    onClick={() => cambiarFavorito(outfit._id, outfit.favorito)}    
                                >
                                    {outfit.favorito ? "♥" : "♡"}
                                </button>

                                <div className="mis-outfit-images">
                                    {outfit.prendas.slice(0, 3).map((prenda) => (
                                        prenda.imagen ? (
                                            <img
                                                key={prenda._id}
                                                src={prenda.imagen}
                                                alt={prenda.nombre}
                                            />
                                        ) : (
                                            <span key={prenda._id}>👕</span>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="mis-outfit-info">
                                <h3>{outfit.nombre}</h3>

                                <p>
                                    {outfit.prendas.length} prendas · {outfit.temporada}
                                </p>

                                <div className="mis-outfit-actions">
                                    <button
                                        type="button"
                                        className="btn-editar-outfit"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-eliminar-outfit"
                                        onClick={() => eliminarOutfit(outfit._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>)}

            <div className="mis-outfits-pagination">
                <button
                    type="button"
                    disabled={pagina === 1}
                    onClick={() => setPagina(pagina - 1)}
                >
                    ← Anterior
                </button>

                <span>
                    Página {pagina} de {totalPaginas}
                </span>

                <button
                    type="button"
                    disabled={pagina >= totalPaginas}
                    onClick={() => setPagina(pagina + 1)}
                >
                    Siguiente →
                </button>
            </div>

        </main>
    );
};

export default MisOutfits;
