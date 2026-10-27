const LoginForm = () => {

    return (
        <div className="auth-form">
            <div className="eyebrow" >BIENVENIDO DE NUEVO</div>
            <h1>Iniciá sesión</h1>
            <p className="subtitle">Entrá a tu armario digital y seguí creando tu estilo.</p>
            <form>
                <div className="field"><label htmlFor="username">Nombre de usuario</label><input id="username"
                    name="username" placeholder="Tu usuario" autocomplete="username" /></div>
                <div className="field"><label htmlFor="password">Contraseña</label><input id="password" name="password"
                    type="password" placeholder="Ingresá tu contraseña" autoComplete="current-password" /></div>
                <button className="submit" type="submit">Ingresar →</button>
            </form>
            <p className="auth-switch">¿Todavía no tenés cuenta? <a href="registro.html">Registrate</a></p>
            <p className="auth-note">Maqueta visual · El formulario todavía no autentica</p>
        </div>
    )
}

export default LoginForm