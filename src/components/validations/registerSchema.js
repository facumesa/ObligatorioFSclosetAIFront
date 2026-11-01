
import * as Yup from "yup";

const registroSchema = (t) =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, t("auth.validation.nameMin"))
      .max(20, t("auth.validation.nameMax"))
      .required(t("auth.validation.nameRequired")),

    username: Yup.string()
      .min(3, t("auth.validation.usernameMin"))
      .max(20, t("auth.validation.usernameMax"))
      .required(t("auth.validation.usernameRequired")),

    email: Yup.string()
      .required(t("auth.validation.emailRequired"))
      .email(t("auth.validation.emailInvalid"))
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        t("auth.validation.emailDomain")
      ),

    password: Yup.string()
      .min(3, t("auth.validation.passwordMin"))
      .max(20, t("auth.validation.passwordMax"))
      .matches(
        /^[a-zA-Z0-9]+$/,
        t("auth.validation.passwordAlphanumeric")
      )
      .required(t("auth.validation.passwordRequired")),

    confirmPassword: Yup.string()
      .required(t("auth.validation.confirmPasswordRequired"))
      .oneOf(
        [Yup.ref("password")],
        t("auth.validation.passwordMismatch")
      ),
  });

export default registroSchema;
