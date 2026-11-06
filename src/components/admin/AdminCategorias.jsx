import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarCategorias,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../../store/slices/categoriasSlice";
import CrearCategoriaModal from "./modals/CrearCategoriaModal";
import EditarCategoriaModal from "./modals/EditarCategoriaModal";
import EliminarCategoriaModal from "./modals/EliminarCategoriaModal";
import {
  mostrarSpinner,
  ocultarSpinner,
} from "../../store/slices/spinnerSlice";
import toast from "react-hot-toast";
import Spinner from "../spinner/Spinner";

const AdminCategorias = () => {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias.lista);
  const categoriasCargadas = useSelector((state) => state.categorias.cargado);
  const token = useSelector((state) => state.auth.token);
  const autenticado = useSelector((state) => state.auth.autenticado);

  const [error, setError] = useState("");
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const abrirModalEliminar = (categoria) => {
    setCategoriaAEliminar(categoria);
    setModalEliminarAbierto(true);
  };

  const cerrarModalEliminar = () => {
    if (eliminando) return;

    setModalEliminarAbierto(false);
    setCategoriaAEliminar(null);
  };

  const abrirModalEditar = (categoria) => {
    setCategoriaAEditar(categoria);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setCategoriaAEditar(null);
  };

  const borrarCategoria = async () => {
    if (!categoriaAEliminar || eliminando) return;

    setEliminando(true);
    dispatch(mostrarSpinner());

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/categorias/${categoriaAEliminar._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || "No se pudo eliminar la categoría");
      }

      dispatch(eliminarCategoria(categoriaAEliminar._id));

      setModalEliminarAbierto(false);
      setCategoriaAEliminar(null);

      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setEliminando(false);
      dispatch(ocultarSpinner());
    }
  };

  const editarCategoria = async (values) => {
    if (!categoriaAEditar) return;

    dispatch(mostrarSpinner());

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/categorias/${categoriaAEditar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            nombre: values.nombre.trim(),
            descripcion: values.descripcion?.trim() || "",
          }),
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || "No se pudo editar la categoría");
      }

      dispatch(actualizarCategoria(datos));

      cerrarModalEditar();
      toast.success("Categoría actualizada correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  const crearCategoria = async (values) => {
    dispatch(mostrarSpinner());

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/categorias`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            nombre: values.nombre.trim(),
            ...(values.descripcion?.trim() && {
              descripcion: values.descripcion.trim(),
            }),
          }),
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.message || "No se pudo crear la categoría");
      }

      dispatch(agregarCategoria(datos.categoria));

      setModalCrearAbierto(false);
      toast.success("Categoría creada correctamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  useEffect(() => {
    if (!autenticado || !token || categoriasCargadas) return;

    const cargarCategorias = async () => {
      dispatch(mostrarSpinner());

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
        setError("");
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        dispatch(ocultarSpinner());
      }
    };

    cargarCategorias();
  }, [autenticado, token, categoriasCargadas, dispatch]);

  return (
    <main className="content admin-categorias">
      <Spinner />
      <div className="mis-outfits-header">
        <div>
          <span className="mis-outfits-eyebrow">ADMINISTRACIÓN</span>

          <h1>Gestión de categorías</h1>

          <p>Administrá las categorías disponibles para los outfits.</p>
        </div>

        <button
          type="button"
          className="btn-nuevo-outfit"
          onClick={() => setModalCrearAbierto(true)}
        >
          + Nueva categoría
        </button>
      </div>

      {error && <p role="alert">{error}</p>}

      <div className="admin-categorias-lista">
        <h2>Categorías disponibles</h2>

        {categorias.length === 0 ? (
          <p>No hay categorías registradas.</p>
        ) : (
          categorias.map((categoria) => (
            <div className="admin-categoria-card" key={categoria._id}>
              <div>
                <h3>{categoria.nombre}</h3>
                <p>{categoria.descripcion || "Sin descripción"}</p>
              </div>

              <div className="admin-categoria-acciones">
                <button
                  type="button"
                  onClick={() => abrirModalEditar(categoria)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => abrirModalEliminar(categoria)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <CrearCategoriaModal
        isOpen={modalCrearAbierto}
        onRequestClose={() => setModalCrearAbierto(false)}
        onSave={crearCategoria}
      />
      <EditarCategoriaModal
        isOpen={modalEditarAbierto}
        onRequestClose={cerrarModalEditar}
        categoria={categoriaAEditar}
        onSave={editarCategoria}
      />
      <EliminarCategoriaModal
        isOpen={modalEliminarAbierto}
        onRequestClose={cerrarModalEliminar}
        categoria={categoriaAEliminar}
        onConfirm={borrarCategoria}
        eliminando={eliminando}
      />
    </main>
  );
};

export default AdminCategorias;
