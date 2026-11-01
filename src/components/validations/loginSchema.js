
import * as Yup from "yup";

const loginSchema = (t) =>
  Yup.object().shape({
    username: Yup.string()
      .min(3, t("auth.validation.usernameMin"))
      .max(20, t("auth.validation.usernameMax"))
      .required(t("auth.validation.usernameRequired")),

    password: Yup.string()
      .min(3, t("auth.validation.passwordMin"))
      .max(20, t("auth.validation.passwordMax"))
      .matches(
        /^[a-zA-Z0-9]+$/,
        t("auth.validation.passwordAlphanumeric")
      )
      .required(t("auth.validation.passwordRequired")),
  });

export default loginSchema;
