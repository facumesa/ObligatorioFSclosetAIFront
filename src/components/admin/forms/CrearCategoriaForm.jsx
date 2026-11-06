
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriaSchema } from "../../validations/categoriaSchema";

const CrearCategoriaForm = ({ onSave, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(categoriaSchema),
        defaultValues: {
            nombre: "",
            descripcion: ""
        }
    });

    const onSubmit = async (values) => {
        await onSave(values);
    };

    return (
        <form
            className="crear-categoria-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Nueva categoría</h2>

            <p>Creá una categoría para organizar los outfits.</p>

            <div className="outfit-field">
                <label>Nombre</label>

                <input
                    type="text"
                    placeholder="Ej: Casual"
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
                    placeholder="Describí la categoría..."
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

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Crear categoría"}
                </button>
            </div>
        </form>
    );
};

export default CrearCategoriaForm;
