
import * as yup from "yup";

const prendaSchema = yup.object({
    nombre: yup.string()
        .trim()
        .required("El nombre es obligatorio"),

    tipo: yup.string()
        .trim()
        .required("El tipo es obligatorio"),

    color: yup.string()
        .trim()
        .required("El color es obligatorio"),

    temporada: yup.string()
        .required("Seleccioná una temporada"),

    marca: yup.string(),

    descripcion: yup.string(),

    imagen: yup.mixed()
        .nullable()
        .test(
            "tipoArchivo",
            "Solo se permiten imágenes JPG, PNG o WEBP",
            (archivo) =>
                !archivo ||
                ["image/jpeg", "image/png", "image/webp"].includes(archivo.type)
        )
        .test(
            "tamanoArchivo",
            "La imagen no puede superar los 5 MB",
            (archivo) =>
                !archivo || archivo.size <= 5 * 1024 * 1024
        )
});

export default prendaSchema;
