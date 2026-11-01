import * as Yup from "yup";

const registroSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre no puede superar los 20 caracteres")
    .required("El nombre es obligatorio"),

  username: Yup.string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(20, "El usuario no puede superar los 20 caracteres")
    .required("El usuario es obligatorio"),

  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Ingresá un correo electrónico válido")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "El correo debe incluir un dominio válido, por ejemplo: usuario@gmail.com",
    ),

  password: Yup.string()
    .min(3, "La contraseña debe tener al menos 3 caracteres")
    .max(20, "La contraseña no puede superar los 20 caracteres")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "La contraseña solo puede contener letras y números",
    )
    .required("La contraseña es obligatoria"),

  confirmPassword: Yup.string()
    .required("Debés confirmar la contraseña")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

export default registroSchema;
