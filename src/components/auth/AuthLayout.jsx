
import { useTranslation } from "react-i18next";

const AuthLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="auth-page">
      <section className="auth-side">
        <a className="brand" href="dashboard.html">
          <span className="brand-mark">✦</span>
          closet<span>ai</span>
        </a>

        <div className="auth-art">🧥</div>

        <div>
          <h2>
            {t("auth.layout.title1")}
            <br />
            {t("auth.layout.title2")}
            <br />
            {t("auth.layout.title3")}
          </h2>

          <p>{t("auth.layout.description")}</p>
        </div>
      </section>

      <div className="auth-main">{children}</div>
    </div>
  );
};

export default AuthLayout;
