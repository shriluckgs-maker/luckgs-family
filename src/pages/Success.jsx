import { useEffect } from "react";
import "./home.css";
import LanguageToggle from "../components/LanguageToggle";
import { translate } from "../utils/i18n";

function Success({ language, onLanguageChange, customer, onLuckyRewards }) {
  const t = (key, english) => language === "kn" ? translate(language, key) : english;

  useEffect(() => {
    const timer = setTimeout(() => onLuckyRewards?.(), 3000);
    return () => clearTimeout(timer);
  }, [onLuckyRewards]);

  return (
    <div className="home">
      <LanguageToggle language={language} onChange={onLanguageChange} />
      <div className="card">
        <div className="logo" style={{ fontSize: "70px" }}>🎉</div>
        <h1>
          {language === "kn" ? (
            <><strong className="kannada-brand">ಲಕ್-ಜಿ'ಸ್</strong> ಕುಟುಂಬ ಕ್ಲಬ್‌ಗೆ ಸ್ವಾಗತ</>
          ) : (
            "Welcome to the LUCK-G'S Family Club"
          )}
        </h1>
        <h2 style={{ color: "#6B1525", marginTop: "20px" }}>
          {customer?.name || t("member", "Member")}
        </h2>
        <p className="message" style={{ marginTop: "20px" }}>
          {t("registrationSuccessful", "Registration successful!")}<br /><br />
          {t("spinForReward", "Spin the wheel to reveal your reward.")}
        </p>
        <div style={{ marginTop: "30px", fontSize: "40px" }}>🎁 🎡 📱</div>
        <p style={{ marginTop: "20px", color: "#777", fontWeight: "600" }}>
          {t("openingRewards", "Opening your rewards...")}
        </p>
      </div>
    </div>
  );
}

export default Success;
