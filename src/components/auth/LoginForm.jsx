
import { useState } from "react";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validations/loginSchema";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const ingresar = async (data) => {
        setError("");

        try {
            const respuesta = await fetch(
                "https://obligatorio-f-scloset-ai.vercel.app/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: data.username,
                        password: data.password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(
                    datos.message ||
                    "Verificá tu usuario y contraseña e intentá nuevamente."
                );
                return;
            }

            dispatch(iniciarSesion({
                usuario: datos.user,
                token: datos.token
            }));

            localStorage.setItem("usuario", JSON.stringify(datos.user));
            localStorage.setItem("token", datos.token);

            navigate("/dashboard");

        } catch (error) {
            console.error("Error al conectar con la API:", error);
            setError("No pudimos conectar con el servidor. Intentá nuevamente.");
        }
    };

    return (
        <div className="auth-form">
            <div className="eyebrow">BIENVENIDO DE NUEVO</div>
            <h1>Iniciá sesión</h1>

            <p className="subtitle">
                Entrá a tu armario digital y seguí creando tu estilo.
            </p>

            <form onSubmit={handleSubmit(ingresar)} noValidate>
                <div className="field">
                    <label htmlFor="username">Nombre de usuario</label>

                    <Controller
                        control={control}
                        name="username"
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
                        <p className="field-error">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="password">Contraseña</label>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="password"
                                type="password"
                                placeholder="Ingresá tu contraseña"
                                autoComplete="current-password"
                            />
                        )}
                    />

                    {errors.password && (
                        <p className="field-error">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    className="submit"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? "Ingresando..." : "Ingresar →"}
                </button>

                {error && (
                    <div className="auth-error" role="alert">
                        <span className="auth-error-icon">!</span>
                        <div className="auth-error-content">
                            <strong>No pudimos iniciar sesión</strong>
                            <p>{error}</p>
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
