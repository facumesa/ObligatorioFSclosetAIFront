
import * as yup from "yup";

export const crearOutfitSchema = yup.object({
    nombre: yup
        .string()
        .trim()
        .required("El nombre del outfit es obligatorio")
        .max(20, "El nombre no puede superar los 20 caracteres"),

    descripcion: yup
        .string()
        .trim()
        .nullable(),

    temporada: yup
        .string()
        .required("Seleccioná una temporada"),

    categoriaId: yup
        .string()
        .required("Seleccioná una categoría"),

    prendas: yup
        .array()
        .of(yup.string().required())
        .min(1, "Seleccioná al menos una prenda")
        .required("Seleccioná al menos una prenda"),

    favorito: yup
        .boolean()
        .default(false),
});

export default crearOutfitSchema;