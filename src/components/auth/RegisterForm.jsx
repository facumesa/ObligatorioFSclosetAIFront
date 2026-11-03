import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LanguageSelector from "../translationComponents/LanguageSelector";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registroSchema from "../validations/registerSchema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registroSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registrar = async (data) => {
    setError("");

    const { confirmPassword, ...datosRegistro } = data;

    try {
      const respuesta = await fetch(
        "https://obligatorio-f-scloset-ai.vercel.app/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosRegistro),
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        let mensaje = t("auth.register.errorMessage");

        if (typeof datos.message === "string" && datos.message) {
          mensaje = datos.message;
        }

        if (typeof datos.details === "string" && datos.details) {
          mensaje = datos.details;
        }

        setError(mensaje);
        return;
      }

      navigate("/login");
    } catch (error) {
      setError(t("auth.register.errorMessage"));
    }
  };

  return (
    <div className="auth-form">
      <LanguageSelector />

      <div className="eyebrow">{t("auth.register.eyebrow")}</div>

      <h1>{t("auth.register.title")}</h1>

      <p className="subtitle">{t("auth.register.subtitle")}</p>

      <form onSubmit={handleSubmit(registrar)} noValidate>
        <div className="row-fields">
          <div className="field">
            <label htmlFor="name">{t("auth.register.name")}</label>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="name"
                  placeholder={t("auth.register.namePlaceholder")}
                  autoComplete="name"
                />
              )}
            />

            {errors.name && (
              <p className="field-error">{errors.name.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="username">{t("auth.register.username")}</label>

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="username"
                  placeholder={t("auth.register.usernamePlaceholder")}
                  autoComplete="username"
                />
              )}
            />

            {errors.username && (
              <p className="field-error">{errors.username.message}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">{t("auth.register.email")}</label>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder={t("auth.register.emailPlaceholder")}
                autoComplete="email"
              />
            )}
          />

          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">{t("auth.register.password")}</label>
          <div className="passwordWrapper">

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.register.passwordPlaceholder")}
                  autoComplete="new-password"
                />
              )}
            />
            <button
              type='button'
              className='eyeButton'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">
            {t("auth.register.confirmPassword")}
          </label>

          <div className="passwordWrapper">

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.register.confirmPasswordPlaceholder")}
                  autoComplete="new-password"
                />
              )}
            />
            <button
              type='button'
              className='eyeButton'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>


          {errors.confirmPassword && (
            <p className="field-error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          className="submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting
            ? t("common.loading")
            : `${t("auth.register.submit")} →`}
        </button>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>

            <div className="auth-error-content">
              <strong>{t("auth.register.errorTitle")}</strong>
              <p>{error}</p>
            </div>
          </div>
        )}
      </form>

      <p className="auth-switch">
        {t("auth.register.hasAccount")}{" "}
        <Link to="/login">{t("auth.register.loginLink")}</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
