import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="language-selector">
      <button
        type="button"
        onClick={() => i18n.changeLanguage("es")}
        disabled={i18n.resolvedLanguage === "es"}
      >
        ES
      </button>

      <span>|</span>

      <button
        type="button"
        onClick={() => i18n.changeLanguage("en")}
        disabled={i18n.resolvedLanguage === "en"}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;