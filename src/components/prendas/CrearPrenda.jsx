import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import prendaSchema from "../validations/prendaSchema";
import { agregarPrenda } from "../../store/slices/prendasSlice";
import {
  mostrarSpinner,
  ocultarSpinner,
} from "../../store/slices/spinnerSlice";
import Spinner from "../spinner/Spinner";

const CrearPrenda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [vistaPrevia, setVistaPrevia] = useState(null);

  const tiposPrenda = [
    "Remera",
    "Camisa",
    "Pantalón",
    "Vaquero",
    "Campera",
    "Buzo",
    "Vestido",
    "Calzado",
    "Accesorio",
  ];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(prendaSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      tipo: "",
      color: "",
      temporada: "",
      marca: "",
      descripcion: "",
      imagen: null,
    },
  });

  const imagenSeleccionada = watch("imagen");

  useEffect(() => {
    if (!imagenSeleccionada) {
      setVistaPrevia(null);
      return;
    }

    const url = URL.createObjectURL(imagenSeleccionada);
    setVistaPrevia(url);

    return () => URL.revokeObjectURL(url);
  }, [imagenSeleccionada]);

  const crearPrenda = async (data) => {
    dispatch(mostrarSpinner());

    try {
      const formData = new FormData();

      formData.append("nombre", data.nombre);
      formData.append("tipo", data.tipo);
      formData.append("color", data.color);
      formData.append("temporada", data.temporada);

      if (data.marca?.trim()) {
        formData.append("marca", data.marca.trim());
      }

      if (data.descripcion?.trim()) {
        formData.append("descripcion", data.descripcion.trim());
      }

      if (data.imagen) {
        formData.append("imagen", data.imagen);
      }

      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/prendas`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        },
      );

      const datos = await respuesta.json();
      console.log(datos);

      if (!respuesta.ok) {
        throw new Error(
          datos.details?.[0] || datos.message || "No se pudo crear la prenda",
        );
      }

      dispatch(agregarPrenda(datos.prenda));

      toast.success("¡Prenda agregada correctamente!");

      navigate("/mi-armario");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(ocultarSpinner());
    }
  };

  return (
    <main className="content crear-prenda">
      <Spinner />
      <div className="crear-outfit-header">
        <div>
          <span className="crear-outfit-eyebrow">MI VESTIDOR</span>

          <h1>Agregar nueva prenda</h1>

          <p>
            Sumá una nueva pieza a tu guardarropa y empezá a crear
            combinaciones.
          </p>
        </div>

        <button
          type="button"
          className="btn-volver"
          onClick={() => navigate("/mi-armario")}
        >
          ← Volver
        </button>
      </div>

      <form
        className="crear-outfit-form crear-prenda-form"
        onSubmit={handleSubmit(crearPrenda)}
      >
        <section className="crear-outfit-panel">
          <div className="panel-heading">
            <span className="panel-step">01</span>

            <div>
              <h2>Información de la prenda</h2>
              <p>Contanos sobre tu nueva pieza.</p>
            </div>
          </div>

          <div className="outfit-fields">
            <div className="outfit-field">
              <label htmlFor="prenda-nombre">Nombre de la prenda</label>

              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="prenda-nombre"
                    type="text"
                    placeholder="Ej. Campera de jean"
                  />
                )}
              />

              {errors.nombre && (
                <p className="field-error">{errors.nombre.message}</p>
              )}
            </div>

            <div className="outfit-fields-row">
              <div className="outfit-field">
                <label htmlFor="prenda-tipo">Tipo de prenda</label>

                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="prenda-tipo">
                      <option value="">Seleccioná un tipo</option>

                      {tiposPrenda.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  )}
                />

                {errors.tipo && (
                  <p className="field-error">{errors.tipo.message}</p>
                )}
              </div>

              <div className="outfit-field">
                <label htmlFor="prenda-color">Color</label>

                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="prenda-color"
                      type="text"
                      placeholder="Ej. Azul"
                    />
                  )}
                />

                {errors.color && (
                  <p className="field-error">{errors.color.message}</p>
                )}
              </div>
            </div>

            <div className="outfit-fields-row">
              <div className="outfit-field">
                <label htmlFor="prenda-temporada">Temporada</label>

                <Controller
                  name="temporada"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="prenda-temporada">
                      <option value="">Seleccioná una temporada</option>
                      <option value="Verano">Verano</option>
                      <option value="Otoño">Otoño</option>
                      <option value="Invierno">Invierno</option>
                      <option value="Primavera">Primavera</option>
                      <option value="Cualquiera">Cualquiera</option>
                    </select>
                  )}
                />

                {errors.temporada && (
                  <p className="field-error">{errors.temporada.message}</p>
                )}
              </div>

              <div className="outfit-field">
                <label htmlFor="prenda-marca">Marca (opcional)</label>

                <Controller
                  name="marca"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="prenda-marca"
                      type="text"
                      placeholder="Ej. Zara"
                    />
                  )}
                />
              </div>
            </div>

            <div className="outfit-field">
              <label htmlFor="prenda-descripcion">Descripción (opcional)</label>

              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="prenda-descripcion"
                    rows="3"
                    placeholder="Describí tu prenda..."
                  />
                )}
              />
            </div>
          </div>
        </section>

        <section className="crear-outfit-panel">
          <div className="panel-heading">
            <span className="panel-step">02</span>

            <div>
              <h2>Fotografía de la prenda</h2>
              <p>
                Agregá una imagen para reconocerla fácilmente en tu armario.
              </p>
            </div>
          </div>

          <div className="outfit-field">
            <Controller
              name="imagen"
              control={control}
              render={({ field }) => (
                <input
                  ref={field.ref}
                  name={field.name}
                  id="prenda-imagen"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0] || null);
                  }}
                />
              )}
            />

            {errors.imagen && (
              <p className="field-error">{errors.imagen.message}</p>
            )}
          </div>

          <div className="crear-prenda-preview">
            {vistaPrevia ? (
              <img src={vistaPrevia} alt="Vista previa de la prenda" />
            ) : (
              <div className="crear-prenda-sin-imagen">
                <span>Tu imagen aparecerá acá</span>
              </div>
            )}
          </div>
        </section>

        <div className="crear-outfit-actions">
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate("/mi-armario")}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn-guardar-outfit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Agregando prenda..." : "Agregar prenda"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CrearPrenda;
