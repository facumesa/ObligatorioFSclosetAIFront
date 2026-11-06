import * as yup from "yup";

export const categoriaSchema = yup.object({
    nombre: yup
        .string()
        .trim()
        .required("El nombre de la categoría es obligatorio"),

    descripcion: yup
        .string()
        .optional()
});