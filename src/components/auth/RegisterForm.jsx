import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const nombre = useRef(null);
  const pass = useRef(null);
  const pass2 = useRef(null);
  const correo = useRef(null);
  const usuario = useRef(null);

  const registrar = async (e) => {
    e.preventDefault();
    setError("");

    const name = nombre.current.value;
    const password = pass.current.value;
    const confirmPassword = pass2.current.value;
    const username = usuario.current.value;
    const email = correo.current.value;

    if (
      name.trim() === "" ||
      password.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("Completá todos los campos");
      return;
    }

    if (password != confirmPassword) {
      console.log("verifique la contraseña");

      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const respuesta = await fetch(
        "https://obligatorio-f-scloset-ai.vercel.app/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
          }),
        },
      );

      const datos = await respuesta.json();
      console.log(datos);

      if (!respuesta.ok) {
        setError(
          datos.details || datos.message || "Ocurrió un error al registrarte",
        );
        return;
      }

      console.log("Registro exitoso");
      navigate("/login");
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setError("No pudimos conectar con el servidor. Intentá nuevamente.");
    }
  };

  return (
    <div className="auth-form">
      <div className="eyebrow">EMPEZÁ CON ClosetAI</div>
      <h1>Creá tu cuenta</h1>
      <p className="subtitle">Tu próximo look favorito empieza acá.</p>
      <form onSubmit={registrar}>
        <div className="row-fields">
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              placeholder="Tu nombre"
              ref={nombre}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              placeholder="Tu usuario"
              ref={usuario}
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="nombre@ejemplo.com"
            ref={correo}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Creá una contraseña"
            ref={pass}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="confirm">Repetir contraseña</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="Repetí tu contraseña"
            ref={pass2}
            required
          />
        </div>
        <button className="submit" type="submit">
          Crear cuenta →
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
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
