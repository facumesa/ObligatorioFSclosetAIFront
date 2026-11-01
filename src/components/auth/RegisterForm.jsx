
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registroSchema from "../validations/registerSchema";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        resolver: yupResolver(registroSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const registrar = async (data) => {
        setError("");

        try {
            const respuesta = await fetch(
                "https://obligatorio-f-scloset-ai.vercel.app/v1/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        password: data.password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                const mensaje = Array.isArray(datos.details)
                    ? datos.details.map((detalle) =>
                        typeof detalle === "string"
                            ? detalle
                            : detalle.message
                    ).join(". ")
                    : typeof datos.details === "string"
                        ? datos.details
                        : datos.message;

                setError(mensaje || "Ocurrió un error al registrarte");
                return;
            }

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

            <form onSubmit={handleSubmit(registrar)} noValidate>
                <div className="row-fields">
                    <div className="field">
                        <label htmlFor="name">Nombre</label>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="name"
                                    placeholder="Tu nombre"
                                />
                            )}
                        />

                        {errors.name && (
                            <p className="field-error">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="register-username">Usuario</label>

                        <Controller
                            control={control}
                            name="username"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="register-username"
                                    placeholder="Tu usuario"
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
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="nombre@ejemplo.com"
                            />
                        )}
                    />

                    {errors.email && (
                        <p className="field-error">{errors.email.message}</p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="register-password">Contraseña</label>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="register-password"
                                type="password"
                                placeholder="Creá una contraseña"
                            />
                        )}
                    />

                    {errors.password && (
                        <p className="field-error">{errors.password.message}</p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="confirm">Repetir contraseña</label>

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="confirm"
                                type="password"
                                placeholder="Repetí tu contraseña"
                            />
                        )}
                    />

                    {errors.confirmPassword && (
                        <p className="field-error">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <button
                    className="submit"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta →"}
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
