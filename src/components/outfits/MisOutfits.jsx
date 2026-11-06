import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EditarOutfitModal from "./modals/EditarOutfitModal";
import EliminarOutfitModal from "./modals/EliminarOutfitModal";
import VerOutfitModal from "./modals/VerOutfitModal";
import { guardarCategorias } from "../../store/slices/categoriasSlice";
import { guardarPrendas } from "../../store/slices/prendasSlice";
import {
  mostrarSpinner,
  ocultarSpinner,
} from "../../store/slices/spinnerSlice";
import {
  guardarOutfits,
  eliminarOutfit as eliminarOutfitRedux,
  actualizarOutfit,
} from "../../store/slices/outfitsSlice";
import Spinner from "../spinner/Spinner";
import toast from "react-hot-toast";

const MisOutfits = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const cargado = useSelector((state) => state.outfits.cargado);
  const consultaCargada = useSelector((state) => state.outfits.consultaCargada);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [outfitAEditar, setOutfitAEditar] = useState(null);

  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [outfitAEliminar, setOutfitAEliminar] = useState(null);

  const [outfitAVer, setOutfitAVer] = useState(null);
  const [modalVerAbierto, setModalVerAbierto] = useState(false);

  const outfits = useSelector((state) => state.outfits.lista);
  const totalPaginas = useSelector((state) => state.outfits.totalPaginas);

  const [pagina, setPagina] = useState(1);
  const [temporada, setTemporada] = useState("");
  const [favorito, setFavorito] = useState("");

  const consultaActual = `${pagina}-${temporada}-${favorito}`;

  const token = useSelector((state) => state.auth.token);
  const autenticado = useSelector((state) => state.auth.autenticado);

  const abrirModalVer = (outfit) => {
    setOutfitAVer(outfit);
    setModalVerAbierto(true);
  };

  const cerrarModalVer = () => {
    setModalVerAbierto(false);
    setOutfitAVer(null);
  };

  const abrirModalEliminar = (outfit) => {
    setOutfitAEliminar(outfit);
    setModalEliminarAbierto(true);
  };

  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setOutfitAEliminar(null);
  };

  const abrirModal = (outfit) => {
    setOutfitAEditar(outfit);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setOutfitAEditar(null);
    setModalAbierto(false);
  };

  const prendasCargadas = useSelector((state) => state.prendas.cargado);

  const categoriasCargadas = useSelector((state) => state.categorias.cargado);

  useEffect(() => {
    if (!autenticado || !token) return;
    if (categoriasCargadas) return;

    const cargarCategorias = async () => {
      try {
        const respuesta = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/categorias`,
          {
            headers: {
              Authorization: token,
            },
          },
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las categorías");
        }

        const datos = await respuesta.json();
        dispatch(guardarCategorias(datos));
      } catch (error) {
        setError(error.message);
      }
    };

    cargarCategorias();
  }, [categoriasCargadas, dispatch, token, autenticado]);

  useEffect(() => {
    if (!autenticado || !token) return;
    if (prendasCargadas) return;

    const cargarPrendas = async () => {
      try {
        const respuesta = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/prendas`,
          {
            headers: {
              Authorization: token,
            },
          },
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las prendas");
        }

        const datos = await respuesta.json();

        dispatch(guardarPrendas(datos));
      } catch (error) {
        setError(error.message);
      }
    };

    cargarPrendas();
  }, [prendasCargadas, dispatch, token, autenticado]);

  const eliminarOutfit = async (id) => {
    try {
      dispatch(mostrarSpinner());

      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/outfits/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        },
      );

      console.log(respuesta);

      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el outfit");
      }

      dispatch(eliminarOutfitRedux(id));

      const datos = await cargarOutfits(pagina);

      if (pagina > datos.totalPages && pagina > 1) {
        setPagina(Math.max(1, datos.totalPages));
      }

      toast.success("Outfit eliminado correctamente");
      cerrarModalEliminar();
    } catch (error) {
      setError(error.message);
      toast.error("El outfit no pudo ser eliminado");
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  const cambiarFavorito = async (id, favoritoActual) => {
    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/outfits/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            favorito: !favoritoActual,
          }),
        },
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el favorito");
      }

      const outfitActual = outfits.find((outfit) => outfit._id === id);

      if (outfitActual) {
        dispatch(
          actualizarOutfit({
            ...outfitActual,
            favorito: !favoritoActual,
          }),
        );
      }

      if (favorito === "true") {
        const datos = await cargarOutfits();

        if (pagina > datos.totalPages) {
          setPagina(Math.max(1, datos.totalPages));
        }
      }

      if (favoritoActual) {
        toast.success("Outfit eliminado de favoritos");
      } else {
        toast.success("Outfit agregado a favoritos");
      }
    } catch (error) {
      setError(error.message);
      toast.error("El outfit no pudo ser marcado como favorito");
    }
  };

  const editarOutfit = async (values) => {
    dispatch(mostrarSpinner());
    setError("");

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/outfits/${outfitAEditar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...values,
            descripcion: values.descripcion?.trim() || undefined,
          }),
        },
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo editar el outfit");
      }

      cerrarModal();

      const respuestaLista = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/outfits?page=${pagina}&limit=6&temporada=${temporada}&favorito=${favorito}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (!respuestaLista.ok) {
        throw new Error(
          "El outfit se guardó, pero no se pudo actualizar la lista",
        );
      }

      const datos = await respuestaLista.json();

      dispatch(guardarOutfits(datos));
      toast.success("Outfit editado correctamente");
    } catch (error) {
      setError(error.message);
      toast.error("No fue posible editar el outfit");
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  const cargarOutfits = async (paginaActual = pagina) => {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/v1/outfits?page=${paginaActual}&limit=6&temporada=${temporada}&favorito=${favorito}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los outfits");
    }

    const datos = await respuesta.json();

    dispatch(
      guardarOutfits({
        ...datos,
        consulta: `${paginaActual}-${temporada}-${favorito}`,
      }),
    );

    return datos;
  };

  useEffect(() => {
    if (!autenticado || !token) return;
    if (cargado && consultaCargada === consultaActual) {
      return;
    }

    const cargar = async () => {
      dispatch(mostrarSpinner());

      try {
        await cargarOutfits();
      } catch (error) {
        setError(error.message);
        toast.error("No se pudieron cargar los outfits");
      } finally {
        dispatch(ocultarSpinner());
      }
    };

    cargar();
  }, [pagina, temporada, favorito, token, dispatch, cargado, consultaCargada, autenticado]);

  return (
    <main className="content mis-outfits">
      <Spinner />

      <div className="mis-outfits-header">
        <div>
          <span className="mis-outfits-eyebrow">MI VESTIDOR</span>
          <h1>Mis Outfits</h1>
          <p>Explorá, organizá y editá todas tus combinaciones.</p>
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
          <select
            defaultValue=""
            value={temporada}
            onChange={(e) => {
              setTemporada(e.target.value);
              setPagina(1);
            }}
          >
            <option value="">Todas las temporadas</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
            <option value="Cualquiera">Cualquiera</option>
          </select>

          <select
            defaultValue=""
            value={favorito}
            onChange={(e) => {
              setFavorito(e.target.value);
              setPagina(1);
            }}
          >
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
            <article
              className="mis-outfit-card"
              key={outfit._id}
              onClick={() => abrirModalVer(outfit)}
            >
              <div className="mis-outfit-image">
                <span className="mis-outfit-category">
                  {outfit.categoriaId?.nombre}
                </span>

                <button
                  type="button"
                  className="mis-outfit-favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                    cambiarFavorito(outfit._id, outfit.favorito);
                  }}
                >
                  {outfit.favorito ? "♥" : "♡"}
                </button>

                <div className="mis-outfit-images">
                  {outfit.prendas
                    .slice(0, 3)
                    .map((prenda) =>
                      prenda.imagen ? (
                        <img
                          key={prenda._id}
                          src={prenda.imagen}
                          alt={prenda.nombre}
                        />
                      ) : (
                        <span key={prenda._id}>👕</span>
                      ),
                    )}
                </div>
              </div>

              <div className="mis-outfit-info">
                <h3>{outfit.nombre}</h3>
                <p>{outfit.descripcion}</p>

                <p>
                  {outfit.prendas.length} prendas · {outfit.temporada}
                </p>

                <div className="mis-outfit-actions">
                  <button
                    type="button"
                    className="btn-editar-outfit"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModal(outfit);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-eliminar-outfit"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModalEliminar(outfit);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <EditarOutfitModal
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        outfit={outfitAEditar}
        onSave={editarOutfit}
      />
      <EliminarOutfitModal
        isOpen={modalEliminarAbierto}
        onRequestClose={cerrarModalEliminar}
        outfit={outfitAEliminar}
        onConfirm={() => {
          if (outfitAEliminar) {
            eliminarOutfit(outfitAEliminar._id);
          }
        }}
      />
      <VerOutfitModal
        isOpen={modalVerAbierto}
        onRequestClose={cerrarModalVer}
        outfit={outfitAVer}
      />

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
