import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import prendaSchema from "../../validations/prendaSchema";

const EditPrendaForm = ({ prenda, onSave, onCancel }) => {
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
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
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

  const [eliminarImagen, setEliminarImagen] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(null);

  const imagenSeleccionada = watch("imagen");

  useEffect(() => {
    if (prenda) {
      reset({
        nombre: prenda.nombre || "",
        tipo: prenda.tipo || "",
        color: prenda.color || "",
        temporada: prenda.temporada || "",
        marca: prenda.marca || "",
        descripcion: prenda.descripcion || "",
        imagen: null,
      });

      setEliminarImagen(false);
    }
  }, [prenda, reset]);

  useEffect(() => {
    if (!imagenSeleccionada) {
      setVistaPrevia(null);
      return;
    }

    const url = URL.createObjectURL(imagenSeleccionada);
    setVistaPrevia(url);

    return () => URL.revokeObjectURL(url);
  }, [imagenSeleccionada]);

  const onSubmit = async (values) => {
    await onSave({
      ...values,
      eliminarImagen,
    });
  };

  return (
    <form className="crear-outfit-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="outfit-fields">
        <h2>Editar prenda</h2>

        <div className="outfit-field">
          <label htmlFor="editar-prenda-nombre">Nombre</label>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <input {...field} id="editar-prenda-nombre" type="text" />
            )}
          />
          {errors.nombre && (
            <p className="field-error">{errors.nombre.message}</p>
          )}
        </div>

        <div className="outfit-fields-row">
          <div className="outfit-field">
            <label htmlFor="editar-prenda-tipo">Tipo</label>
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <select {...field} id="editar-prenda-tipo">
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
            <label htmlFor="editar-prenda-color">Color</label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <input {...field} id="editar-prenda-color" />
              )}
            />
            {errors.color && (
              <p className="field-error">{errors.color.message}</p>
            )}
          </div>
        </div>

        <div className="outfit-fields-row">
          <div className="outfit-field">
            <label htmlFor="editar-prenda-temporada">Temporada</label>
            <Controller
              name="temporada"
              control={control}
              render={({ field }) => (
                <select {...field} id="editar-prenda-temporada">
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
            <label htmlFor="editar-prenda-marca">Marca (opcional)</label>
            <Controller
              name="marca"
              control={control}
              render={({ field }) => (
                <input {...field} id="editar-prenda-marca" />
              )}
            />
          </div>
        </div>

        <div className="outfit-field">
          <label htmlFor="editar-prenda-descripcion">
            Descripción (opcional)
          </label>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <textarea {...field} id="editar-prenda-descripcion" rows="3" />
            )}
          />
        </div>

        <div className="outfit-field">
          <label>Fotografía de la prenda</label>

          <div className="crear-prenda-preview">
            {vistaPrevia ? (
              <img src={vistaPrevia} alt="Nueva fotografía" />
            ) : !eliminarImagen && prenda?.imagen ? (
              <img src={prenda.imagen} alt={prenda.nombre} />
            ) : (
              <div className="crear-prenda-sin-imagen">
                <span>Sin imagen</span>
              </div>
            )}
          </div>

          <Controller
            name="imagen"
            control={control}
            render={({ field }) => (
              <input
                ref={field.ref}
                name={field.name}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onBlur={field.onBlur}
                onChange={(e) => {
                  const archivo = e.target.files?.[0] || null;

                  field.onChange(archivo);

                  if (archivo) {
                    setEliminarImagen(false);
                  }
                }}
              />
            )}
          />

          {errors.imagen && (
            <p className="field-error">{errors.imagen.message}</p>
          )}

          {prenda?.imagen && (
            <label className="quitar-imagen">
              <input
                type="checkbox"
                checked={eliminarImagen}
                onChange={(e) => setEliminarImagen(e.target.checked)}
                disabled={!!imagenSeleccionada}
              />

              <span>Quitar fotografía actual</span>
            </label>
          )}

          {imagenSeleccionada && (
            <p className="ver-prenda-label">
              Se reemplazará la fotografía actual.
            </p>
          )}
        </div>
      </div>

      <div className="crear-outfit-actions">
        <button
          type="button"
          className="btn-cancelar"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn-guardar-outfit"
          disabled={isSubmitting || (!isDirty && !eliminarImagen)}
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

export default EditPrendaForm;
