import "./languageToggle.css";

function LanguageToggle({ language, onChange }) {
  return (
    <div className="language-toggle" aria-label="Language">
      <button
        type="button"
        className={language === "en" ? "active" : ""}
        onClick={() => onChange("en")}
      >
        English
      </button>
      <button
        type="button"
        className={language === "kn" ? "active" : ""}
        onClick={() => onChange("kn")}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}

export default LanguageToggle;
