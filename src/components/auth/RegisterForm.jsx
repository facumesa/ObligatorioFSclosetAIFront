import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registroSchema from "../validations/registerSchema";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registroSchema),
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
        `${import.meta.env.VITE_API_BASE_URL}/v1/auth/signup`,
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
        let mensaje = "Ocurrió un error al registrarte. Intentá nuevamente.";

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
      setError("Ocurrió un error al registrarte. Intentá nuevamente.");
    }
  };

  return (
    <div className="auth-form">

      <div className="eyebrow">EMPEZÁ A CREAR TU ESTILO</div>

      <h1>Creá tu cuenta</h1>

      <p className="subtitle">Registrate y empezá a organizar tu armario digital.</p>

      <form onSubmit={handleSubmit(registrar)} noValidate>
        <div className="row-fields">
          <div className="field">
            <label htmlFor="name">Nombre</label>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="name"
                  placeholder="Tu nombre"
                  autoComplete="name"
                />
              )}
            />

            {errors.name && (
              <p className="field-error">{errors.name.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="username">Nombre de usuario</label>

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="username"
                  placeholder="Elegí un usuario"
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
          <label htmlFor="email">Correo electrónico</label>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
              />
            )}
          />

          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <div className="passwordWrapper">

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Creá una contraseña"
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
            Confirmar contraseña
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
                  placeholder="Repetí tu contraseña"
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
            ? "Cargando..."
            : "Crear cuenta →"}
        </button>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>

            <div className="auth-error-content">
              <strong>No pudimos crear tu cuenta</strong>
              <p>{error}</p>
            </div>
          </div>
        )}
      </form>

      <p className="auth-switch">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
