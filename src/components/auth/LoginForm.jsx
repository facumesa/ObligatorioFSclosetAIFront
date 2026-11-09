import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iniciarSesion } from "../../store/slices/authSlice";
import loginSchema from "../validations/loginSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
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
        `${import.meta.env.VITE_API_BASE_URL}/v1/auth/login`,
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

      <div className="eyebrow">BIENVENIDO DE NUEVO</div>

      <h1>Iniciá sesión</h1>

      <p className="subtitle">Entrá a tu armario digital y seguí creando tu estilo.</p>

      <form onSubmit={handleSubmit(ingresar)} noValidate>
        <div className="field">
          <label htmlFor="username">Nombre de usuario</label>

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="username"
                placeholder="Tu usuario"
                autoComplete="username"
              />
            )}
          />

          {errors.username && (
            <p className="field-error">{errors.username.message}</p>
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
                placeholder="Ingresá tu contraseña"
                autoComplete="current-password"
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

        <button
          className="submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Cargando..." : "Ingresar →"}
        </button>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>

            <div className="auth-error-content">
              <strong>No pudimos iniciar sesión</strong>
              <p>Verificá tu usuario y contraseña e intentá nuevamente.</p>
            </div>
          </div>
        )}
      </form>

      <p className="auth-switch">
        ¿Todavía no tenés cuenta?{" "}
        <Link to="/registro">Registrate</Link>
      </p>
    </div>
  );
};

export default LoginForm;
