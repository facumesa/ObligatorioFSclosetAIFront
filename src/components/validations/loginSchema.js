
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(20, "El usuario no puede superar los 20 caracteres")
    .required("El usuario es obligatorio"),

  password: Yup.string()
    .min(3, "La contraseña debe tener al menos 3 caracteres")
    .max(20, "La contraseña no puede superar los 20 caracteres")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "La contraseña solo puede contener letras y números"
    )
    .required("La contraseña es obligatoria"),
});

export default loginSchema;
