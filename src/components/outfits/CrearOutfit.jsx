import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import crearOutfitSchema from "../validations/outfitSchema";
import { useDispatch, useSelector } from "react-redux";
import { guardarPrendas } from "../../store/slices/prendasSlice";
import { guardarCategorias } from "../../store/slices/categoriasSlice";
import { invalidarOutfits } from "../../store/slices/outfitsSlice";
import toast from "react-hot-toast";

const CrearOutfit = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const recomendacionIA = location.state?.recomendacion;

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const prendasDisponibles = useSelector((state) => state.prendas.lista);

  const prendasCargadas = useSelector((state) => state.prendas.cargado);

  const categorias = useSelector((state) => state.categorias.lista);

  const categoriasCargadas = useSelector((state) => state.categorias.cargado);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(crearOutfitSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoriaId: "",
      temporada: "",
      prendas: [],
      favorito: false,
    },
  });


  useEffect(() => {
    if (!recomendacionIA) return;

    reset({
      nombre: recomendacionIA.nombre || "",
      descripcion: recomendacionIA.descripcion || "",
      categoriaId: "",
      temporada: recomendacionIA.temporada || "",
      prendas: recomendacionIA.prendas || [],
      favorito: false
    });

  }, [recomendacionIA, reset]);


  useEffect(() => {
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
  }, [prendasCargadas, dispatch, token]);

  useEffect(() => {
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
  }, [categoriasCargadas, dispatch, token]);

  const prendasSeleccionadas = watch("prendas");

  const crearOutfit = async (data) => {
    setError("");

    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/v1/outfits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...data,
            descripcion: data.descripcion?.trim() || undefined,
          }),
        },
      );

      const datos = await respuesta.json();
      console.log(datos);

      if (!respuesta.ok) {
        setError(datos.message || "No se pudo crear el outfit");
        return;
      }

      dispatch(invalidarOutfits());

      toast.success("Outfit creado exitosamente");
      navigate("/misoutfits");
    } catch (error) {
      toast.error("No se pudo crear el outfit");
      setError("Ocurrió un error al crear el outfit");
    }
  };

  return (
    <main className="content crear-outfit">
      <div className="crear-outfit-header">
        <div>
          <span className="crear-outfit-eyebrow">MI VESTIDOR</span>

          <h1>Crear nuevo outfit</h1>

          <p>Combiná tus prendas y creá un look único para cada ocasión.</p>
        </div>

        <button
          type="button"
          className="btn-volver"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
      </div>

      <form className="crear-outfit-form" onSubmit={handleSubmit(crearOutfit)}>
        {/* 01 - INFORMACIÓN */}
        <section className="crear-outfit-panel">
          <div className="panel-heading">
            <span className="panel-step">01</span>

            <div>
              <h2>Información del outfit</h2>
              <p>Contanos un poco sobre tu nuevo look.</p>
            </div>
          </div>

          <div className="outfit-fields">
            {/* NOMBRE */}
            <div className="outfit-field">
              <label htmlFor="nombre">Nombre del outfit</label>

              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="nombre"
                    type="text"
                    placeholder="Ej. Look casual de otoño"
                    maxLength={20}
                  />
                )}
              />

              {errors.nombre && (
                <p className="field-error">{errors.nombre.message}</p>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="outfit-field">
              <label htmlFor="descripcion">Descripción</label>

              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="descripcion"
                    rows="3"
                    placeholder="¿Qué hace especial a este outfit?"
                  />
                )}
              />

              {errors.descripcion && (
                <p className="field-error">{errors.descripcion.message}</p>
              )}
            </div>

            <div className="outfit-fields-row">
              {/* CATEGORÍA */}
              <div className="outfit-field">
                <label htmlFor="categoria">Categoría</label>

                <Controller
                  name="categoriaId"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="categoria">
                      <option value="">Seleccioná una categoría</option>

                      {categorias.map((categoria) => (
                        <option key={categoria._id} value={categoria._id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  )}
                />

                {errors.categoriaId && (
                  <p className="field-error">{errors.categoriaId.message}</p>
                )}
              </div>

              {/* TEMPORADA */}
              <div className="outfit-field">
                <label htmlFor="temporada">Temporada</label>

                <Controller
                  name="temporada"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="temporada">
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
            </div>
          </div>
        </section>

        {/* 02 - PRENDAS */}
        <section className="crear-outfit-panel">
          <div className="panel-heading">
            <span className="panel-step">02</span>

            <div>
              <h2>Elegí tus prendas</h2>
              <p>Seleccioná las prendas que querés combinar.</p>
            </div>
          </div>

          {!prendasCargadas ? (
            <p>Cargando prendas...</p>
          ) : (
            <Controller
              name="prendas"
              control={control}
              render={({ field }) => (
                <div className="selector-prendas-grid">
                  {prendasDisponibles.map((prenda) => (
                    <label key={prenda._id} className="prenda-seleccionable">
                      <input
                        type="checkbox"
                        value={prenda._id}
                        checked={field.value.includes(prenda._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, prenda._id]);
                          } else {
                            field.onChange(
                              field.value.filter((id) => id !== prenda._id),
                            );
                          }
                        }}
                      />

                      <div className="prenda-seleccionable-imagen">
                        {prenda.imagen ? (
                          <img src={prenda.imagen} alt={prenda.nombre} />
                        ) : (
                          <span>👕</span>
                        )}
                      </div>

                      <div className="prenda-seleccionable-info">
                        <strong>{prenda.nombre}</strong>
                        <span>
                          {prenda.tipo} · {prenda.color}
                        </span>
                      </div>
                    </label>
                  ))}

                  {prendasDisponibles.length === 0 && (
                    <p>Todavía no tenés prendas guardadas.</p>
                  )}
                </div>
              )}
            />
          )}

          {errors.prendas && (
            <p className="field-error">{errors.prendas.message}</p>
          )}
        </section>

        {/* 03 - VISTA PREVIA */}
        <section className="crear-outfit-panel">
          <div className="panel-heading">
            <span className="panel-step">03</span>

            <div>
              <h2>Tu combinación</h2>
              <p>Revisá las prendas seleccionadas antes de guardar.</p>
            </div>
          </div>

          <div className="outfit-preview">
            {prendasSeleccionadas.length > 0 ? (
              <div className="outfit-preview-prendas">
                {prendasDisponibles
                  .filter((prenda) => prendasSeleccionadas.includes(prenda._id))
                  .map((prenda) => (
                    <div key={prenda._id} className="outfit-preview-item">
                      {prenda.imagen ? (
                        <img src={prenda.imagen} alt={prenda.nombre} />
                      ) : (
                        <span>👕</span>
                      )}

                      <p>{prenda.nombre}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="outfit-preview-placeholder">
                <span>✦</span>
                <strong>Tu próximo look empieza acá</strong>
                <p>Las prendas que elijas aparecerán en este espacio.</p>
              </div>
            )}
          </div>

          {/* FAVORITO */}
          <Controller
            name="favorito"
            control={control}
            render={({ field }) => (
              <label className="outfit-favorito">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <span>♡ Marcar como outfit favorito</span>
              </label>
            )}
          />
        </section>

        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}

        <div className="crear-outfit-actions">
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn-guardar-outfit"
            disabled={isSubmitting || !prendasCargadas || !categoriasCargadas}
          >
            {isSubmitting ? "Creando outfit..." : "Crear outfit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CrearOutfit;
