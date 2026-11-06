import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import { guardarPrendas } from "../../store/slices/prendasSlice";
import {
  mostrarSpinner,
  ocultarSpinner,
} from "../../store/slices/spinnerSlice";
import Spinner from "../spinner/Spinner";
import PrendaCard from "./PrendaCard.jsx";
import EliminarPrendaModal from "./modals/EliminarPrendaModal";
import { eliminarPrenda } from "../../store/slices/prendasSlice";
import EditarPrendaModal from "./modals/EditarPrendaModal";
import VerPrendaModal from "./modals/VerPrendaModal";
import { actualizarPrenda } from "../../store/slices/prendasSlice";

const MiArmario = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const prendas = useSelector((state) => state.prendas.lista);
  const prendasCargadas = useSelector((state) => state.prendas.cargado);

  const [tipo, setTipo] = useState("");
  const [temporada, setTemporada] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [prendaAEliminar, setPrendaAEliminar] = useState(null);

  const [prendaAEditar, setPrendaAEditar] = useState(null);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);

  const [prendaAVer, setPrendaAVer] = useState(null);
  const [modalVerAbierto, setModalVerAbierto] = useState(false);

  const abrirModalEditar = (prenda) => {
    setPrendaAEditar(prenda);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setPrendaAEditar(null);
  };

  const abrirModalVer = (prenda) => {
    setPrendaAVer(prenda);
    setModalVerAbierto(true);
  };

  const cerrarModalVer = () => {
    setModalVerAbierto(false);
    setPrendaAVer(null);
  };

  const abrirModalEliminar = (prenda) => {
    setPrendaAEliminar(prenda);
    setModalEliminarAbierto(true);
  };

  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setPrendaAEliminar(null);
  };

  useEffect(() => {
    if (prendasCargadas) return;

    const cargarPrendas = async () => {
      dispatch(mostrarSpinner());

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
        toast.error(error.message);
      } finally {
        dispatch(ocultarSpinner());
      }
    };

    cargarPrendas();
  }, [prendasCargadas, token, dispatch]);

  const eliminarPrendaSeleccionada = async () => {
    if (!prendaAEliminar) return;

    dispatch(mostrarSpinner());

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/prendas/${prendaAEliminar._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        },
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la prenda");
      }

      dispatch(eliminarPrenda(prendaAEliminar._id));

      cerrarModalEliminar();

      toast.success("Prenda eliminada correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  const editarPrenda = async (values) => {
    if (!prendaAEditar) return;

    dispatch(mostrarSpinner());

    try {
      const formData = new FormData();

      formData.append("nombre", values.nombre);
      formData.append("tipo", values.tipo);
      formData.append("color", values.color);
      formData.append("temporada", values.temporada);
      formData.append("marca", values.marca || "");
      formData.append("descripcion", values.descripcion || "");

      if (values.imagen) {
        formData.append("imagen", values.imagen);
      } else if (values.eliminarImagen) {
        formData.append("eliminarImagen", "true");
      }

      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/prendas/${prendaAEditar._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || "No se pudo editar la prenda");
      }

      dispatch(actualizarPrenda(datos));

      cerrarModalEditar();

      toast.success("Prenda actualizada correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  const tiposDisponibles = [...new Set(prendas.map((prenda) => prenda.tipo))];

  const prendasFiltradas = prendas.filter((prenda) => {
    const coincideTipo = !tipo || prenda.tipo === tipo;

    const coincideTemporada =
      !temporada ||
      prenda.temporada === temporada ||
      prenda.temporada === "Cualquiera";

    const coincideBusqueda = prenda.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return coincideTipo && coincideTemporada && coincideBusqueda;
  });

  return (
    <main className="content mi-armario">
      <Spinner />
      <div className="mis-outfits-header">
        <div>
          <span className="mis-outfits-eyebrow">MI VESTIDOR</span>

          <h1>Mi Armario</h1>

          <p>
            Organizá tus prendas y descubrí todas las posibilidades de tu
            guardarropa.
          </p>
        </div>

        <button
          type="button"
          className="btn-nuevo-outfit"
          onClick={() => navigate("/crear-prenda")}
        >
          + Agregar prenda
        </button>
      </div>

      <div className="mis-outfits-toolbar">
        <div className="mis-outfits-filters">
          <input
            type="text"
            placeholder="Buscar una prenda..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos los tipos</option>

            {tiposDisponibles.map((tipoPrenda) => (
              <option key={tipoPrenda} value={tipoPrenda}>
                {tipoPrenda}
              </option>
            ))}
          </select>

          <select
            value={temporada}
            onChange={(e) => setTemporada(e.target.value)}
          >
            <option value="">Todas las temporadas</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
      </div>

      <div className="mis-outfits-results">
        <h2>Mis prendas</h2>

        <span>{prendasFiltradas.length} prendas encontradas</span>
      </div>

      {!prendasCargadas ? (
        <p>Cargando prendas...</p>
      ) : prendasFiltradas.length === 0 ? (
        <div className="empty-outfits">
          <h3>No encontramos prendas</h3>
          <p>Agregá una prenda o modificá los filtros.</p>
        </div>
      ) : (
        <div className="mis-outfits-grid">
          {prendasFiltradas.map((prenda) => (
            <PrendaCard
              key={prenda._id}
              prenda={prenda}
              onVer={abrirModalVer}
              onEditar={abrirModalEditar}
              onEliminar={abrirModalEliminar}
            />
          ))}
        </div>
      )}

      <EliminarPrendaModal
        isOpen={modalEliminarAbierto}
        onRequestClose={cerrarModalEliminar}
        prenda={prendaAEliminar}
        onConfirm={eliminarPrendaSeleccionada}
      />
      <EditarPrendaModal
        isOpen={modalEditarAbierto}
        onRequestClose={cerrarModalEditar}
        prenda={prendaAEditar}
        onSave={editarPrenda}
      />
      <VerPrendaModal
        isOpen={modalVerAbierto}
        onRequestClose={cerrarModalVer}
        prenda={prendaAVer}
      />
    </main>
  );
};

export default MiArmario;
