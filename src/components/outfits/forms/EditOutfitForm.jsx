
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import crearOutfitSchema from "../../validations/outfitSchema";
import { useSelector } from "react-redux";

const EditOutfitForm = ({ outfit, onSave, onCancel }) => {

    const prendasDisponibles = useSelector(
        (state) => state.prendas.lista
    );

    const categorias = useSelector(
        (state) => state.categorias.lista
    );
    

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(crearOutfitSchema),
        defaultValues: {
            nombre: "",
            descripcion: "",
            categoriaId: "",
            temporada: "",
            prendas: [],
            favorito: false
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (outfit) {
            reset({
                nombre: outfit.nombre || "",
                descripcion: outfit.descripcion || "",
                categoriaId: outfit.categoriaId?._id || "",
                temporada: outfit.temporada || "",
                prendas: outfit.prendas.map((prenda) => prenda._id),
                favorito: !!outfit.favorito
            });
        }
    }, [outfit, reset]);

    const prendasSeleccionadas = watch("prendas");

    const onSubmit = async (values) => {
        await onSave(values);
    };

    return (
        <form
            className="crear-outfit-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="outfit-fields">

                {/* NOMBRE */}
                <div className="outfit-field">
                    <label htmlFor="editar-nombre">Nombre del outfit</label>

                    <Controller
                        name="nombre"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="editar-nombre"
                                type="text"
                                placeholder="Nombre del outfit"
                            />
                        )}
                    />

                    {errors.nombre && (
                        <p className="field-error">
                            {errors.nombre.message}
                        </p>
                    )}
                </div>

                {/* DESCRIPCIÓN */}
                <div className="outfit-field">
                    <label htmlFor="editar-descripcion">Descripción</label>

                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                id="editar-descripcion"
                                rows="3"
                                placeholder="Descripción del outfit"
                            />
                        )}
                    />

                    {errors.descripcion && (
                        <p className="field-error">
                            {errors.descripcion.message}
                        </p>
                    )}
                </div>

                {/* CATEGORÍA Y TEMPORADA */}
                <div className="outfit-fields-row">

                    <div className="outfit-field">
                        <label htmlFor="editar-categoria">Categoría</label>

                        <Controller
                            name="categoriaId"
                            control={control}
                            render={({ field }) => (
                                <select {...field} id="editar-categoria">
                                    <option value="">
                                        Seleccioná una categoría
                                    </option>

                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria._id}
                                            value={categoria._id}
                                        >
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />

                        {errors.categoriaId && (
                            <p className="field-error">
                                {errors.categoriaId.message}
                            </p>
                        )}
                    </div>

                    <div className="outfit-field">
                        <label htmlFor="editar-temporada">Temporada</label>

                        <Controller
                            name="temporada"
                            control={control}
                            render={({ field }) => (
                                <select {...field} id="editar-temporada">
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
                            <p className="field-error">
                                {errors.temporada.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* PRENDAS */}
                <div className="outfit-field">
                    <label>Prendas del outfit</label>

                    <Controller
                        name="prendas"
                        control={control}
                        render={({ field }) => (
                            <div className="selector-prendas-grid">
                                {prendasDisponibles.map((prenda) => (
                                    <label
                                        key={prenda._id}
                                        className="prenda-seleccionable"
                                    >
                                        <input
                                            type="checkbox"
                                            value={prenda._id}
                                            checked={field.value.includes(prenda._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    field.onChange([
                                                        ...field.value,
                                                        prenda._id
                                                    ]);
                                                } else {
                                                    field.onChange(
                                                        field.value.filter(
                                                            (id) => id !== prenda._id
                                                        )
                                                    );
                                                }
                                            }}
                                        />

                                        <div className="prenda-seleccionable-imagen">
                                            {prenda.imagen ? (
                                                <img
                                                    src={prenda.imagen}
                                                    alt={prenda.nombre}
                                                />
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
                            </div>
                        )}
                    />

                    {errors.prendas && (
                        <p className="field-error">
                            {errors.prendas.message}
                        </p>
                    )}
                </div>

                {/* VISTA PREVIA */}
                <div className="outfit-field">
                    <label>Tu combinación</label>

                    <div className="outfit-preview">
                        {prendasSeleccionadas.length > 0 ? (
                            <div className="outfit-preview-prendas">
                                {prendasDisponibles
                                    .filter((prenda) =>
                                        prendasSeleccionadas.includes(prenda._id)
                                    )
                                    .map((prenda) => (
                                        <div
                                            key={prenda._id}
                                            className="outfit-preview-item"
                                        >
                                            {prenda.imagen ? (
                                                <img
                                                    src={prenda.imagen}
                                                    alt={prenda.nombre}
                                                />
                                            ) : (
                                                <span>👕</span>
                                            )}
                                            <p>{prenda.nombre}</p>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p>No hay prendas seleccionadas.</p>
                        )}
                    </div>
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
                                onChange={(e) =>
                                    field.onChange(e.target.checked)
                                }
                            />
                            <span>♡ Marcar como outfit favorito</span>
                        </label>
                    )}
                />

            </div>

            {/* BOTONES */}
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
                    disabled={isSubmitting || !isDirty}
                >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
        </form>
    );
};

export default EditOutfitForm;
