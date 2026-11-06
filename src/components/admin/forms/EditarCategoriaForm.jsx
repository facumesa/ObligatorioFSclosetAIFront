
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriaSchema } from "../../validations/categoriaSchema";

const EditarCategoriaForm = ({ categoria, onSave, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(categoriaSchema),
        defaultValues: {
            nombre: "",
            descripcion: ""
        }
    });

    useEffect(() => {
        if (categoria) {
            reset({
                nombre: categoria.nombre || "",
                descripcion: categoria.descripcion || ""
            });
        }
    }, [categoria, reset]);

    const onSubmit = async (values) => {
        await onSave(values);
    };

    return (
        <form
            className="crear-categoria-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Editar categoría</h2>

            <p>Modificá los datos de la categoría.</p>

            <div className="outfit-field">
                <label>Nombre</label>

                <input
                    type="text"
                    {...register("nombre")}
                />

                {errors.nombre && (
                    <p className="field-error">
                        {errors.nombre.message}
                    </p>
                )}
            </div>

            <div className="outfit-field">
                <label>Descripción (opcional)</label>

                <textarea
                    rows="3"
                    {...register("descripcion")}
                />

                {errors.descripcion && (
                    <p className="field-error">
                        {errors.descripcion.message}
                    </p>
                )}
            </div>

            <div className="eliminar-acciones">
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
        </form>
    );
};

export default EditarCategoriaForm;
