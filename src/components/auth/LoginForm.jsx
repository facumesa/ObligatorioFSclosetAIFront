import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LanguageSelector from "../translationComponents/LanguageSelector";

import { iniciarSesion } from "../../store/slices/authSlice";
import loginSchema from "../validations/loginSchema";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [error, setError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema(t)),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const ingresar = async (data) => {
    setError(false);

    try {
      const respuesta = await fetch(
        "https://obligatorio-f-scloset-ai.vercel.app/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(true);
        return;
      }

      dispatch(
        iniciarSesion({
          usuario: datos.user,
          token: datos.token,
        }),
      );

      localStorage.setItem("usuario", JSON.stringify(datos.user));
      localStorage.setItem("token", datos.token);

      navigate("/dashboard");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="auth-form">
      <LanguageSelector />

      <div className="eyebrow">{t("auth.login.eyebrow")}</div>

      <h1>{t("auth.login.title")}</h1>

      <p className="subtitle">{t("auth.login.subtitle")}</p>

      <form onSubmit={handleSubmit(ingresar)} noValidate>
        <div className="field">
          <label htmlFor="username">{t("auth.login.username")}</label>

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="username"
                placeholder={t("auth.login.usernamePlaceholder")}
                autoComplete="username"
              />
            )}
          />

          {errors.username && (
            <p className="field-error">{errors.username.message}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">{t("auth.login.password")}</label>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="password"
                type="password"
                placeholder={t("auth.login.passwordPlaceholder")}
                autoComplete="current-password"
              />
            )}
          />

          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </div>

        <button
          className="submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? t("common.loading") : `${t("auth.login.submit")} →`}
        </button>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>

            <div className="auth-error-content">
              <strong>{t("auth.login.errorTitle")}</strong>
              <p>{t("auth.login.errorMessage")}</p>
            </div>
          </div>
        )}
      </form>

      <p className="auth-switch">
        {t("auth.login.noAccount")}{" "}
        <Link to="/registro">{t("auth.login.registerLink")}</Link>
      </p>
    </div>
  );
};

export default LoginForm;
