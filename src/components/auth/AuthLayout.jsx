const AuthLayout = ({children}) => {

    return (
    <div className="auth-page">
        <section className="auth-side"><a class="brand" href="dashboard.html"><span
                    className="brand-mark">✦</span>closet<span>ai</span></a>
            <div className="auth-art">🧥</div>
            <div>
                <h2>Tu armario.<br/>Tu estilo.<br/>Tus reglas.</h2>
                <p>Descubrí una forma más inteligente de organizar tu ropa y crear looks que te representen.</p>
            </div>
        </section>
        <div className ="auth-main">
            {children}
        </div>
    </div>
    )
}

export default AuthLayout;

