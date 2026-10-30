import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const name = useRef(null);
  const pass = useRef(null);

  const ingresar = async (e) => {
    e.preventDefault();
    setError(false);

    const username = name.current.value;
    const password = pass.current.value;

    try {
      const respuesta = await fetch(
        "https://obligatorio-f-scloset-ai.vercel.app/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        console.log("Error:", datos.message);
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

      console.log("Login exitoso");
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setError(true);
    }
  };

  return (
    <div className="auth-form">
      <div className="eyebrow">BIENVENIDO DE NUEVO</div>
      <h1>Iniciá sesión</h1>
      <p className="subtitle">
        Entrá a tu armario digital y seguí creando tu estilo.
      </p>
      <form onSubmit={ingresar}>
        <div className="field">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            name="username"
            placeholder="Tu usuario"
            autoComplete="username"
            ref={name}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Ingresá tu contraseña"
            autoComplete="current-password"
            ref={pass}
          />
        </div>
        <button className="submit" type="submit">
          Ingresar →
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
        ¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
      <p className="auth-note">
        Maqueta visual · El formulario todavía no autentica
      </p>
    </div>
  );
};

export default LoginForm;
