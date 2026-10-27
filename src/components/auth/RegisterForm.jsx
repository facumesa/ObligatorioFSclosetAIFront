const RegisterForm = () => {
    return (
        <div className="auth-form">
            <div className="eyebrow">EMPEZÁ CON ClosetAI</div>
            <h1>Creá tu cuenta</h1>
            <p className="subtitle">Tu próximo look favorito empieza acá.</p>
            <form>
                <div className="row-fields">
                    <div className="field"><label htmlFor="name">Nombre</label><input id="name" name="name"
                        placeholder="Tu nombre" /></div>
                    <div className="field"><label htmlFor="username">Usuario</label><input id="username" name="username"
                        placeholder="Tu usuario" /></div>
                </div>
                <div className="field"><label htmlFor="email">Correo electrónico</label><input id="email" name="email"
                    type="email" placeholder="nombre@ejemplo.com" /></div>
                <div className="field"><label htmlFor="password">Contraseña</label><input id="password" name="password"
                    type="password" placeholder="Creá una contraseña" /></div>
                <div className="field"><label htmlFor="confirm">Repetir contraseña</label><input id="confirm" name="confirm"
                    type="password" placeholder="Repetí tu contraseña" /></div><button className="submit"
                        type="submit">Crear cuenta →</button>
            </form>
            <p className="auth-switch">¿Ya tenés cuenta? <a href="login.html">Iniciá sesión</a></p>
            <p className="auth-note">Maqueta visual · El formulario todavía no registra usuarios</p>
        </div>
    )
}

export default RegisterForm;