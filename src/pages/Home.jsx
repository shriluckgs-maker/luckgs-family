import "./landing.css";
import logo from "../assets/logo.jpeg";
import parshwanathBhagwan from "../assets/devotional/parshwanath-bhagwan.png";
import nakodaBhairav from "../assets/devotional/nakoda-bhairav.png";
import LanguageToggle from "../components/LanguageToggle";
import { translate } from "../utils/i18n";

function Home({ language, onLanguageChange, onJoin, onShowQr }) {
  const t = (key, english) => language === "kn" ? translate(language, key) : english;

  return (
    <div className="landing-page">
      <LanguageToggle language={language} onChange={onLanguageChange} />

      <div className="devotional-header">
        <div className="devotional-item devotional-left">
          <p>SHREE PARSWANATHAYA NAMAH</p>
          <img src={parshwanathBhagwan} alt="Shree Parshwanath Bhagwan" />
        </div>
        <div className="devotional-item devotional-right">
          <p>SHRRE NAKODA BHAIRAVAYA NAMAH</p>
          <img src={nakodaBhairav} alt="Shree Nakoda Bhairav" />
        </div>
      </div>

      <div className="landing-card">

        {/* Logo */}

        <img
          src={logo}
          alt="LUCK-G'S"
          className="landing-logo"
        />

        {/* Brand */}

        <h1 className={`landing-title ${language === "kn" ? "kannada-brand" : ""}`}>
          {language === "kn" ? "ಲಕ್-ಜಿ'ಸ್" : "LUCK-G'S"}
        </h1>

        <h2 className="landing-subtitle">
          {t("familyClub", "FAMILY CLUB")}
        </h2>

        <p className="landing-message">
          {t("taglineLine1", "Every Visit Matters.")}
          <br />
          {t("taglineLine2", "Every Customer Is Family.")}
        </p>

        {/* Benefits */}

        <div className="benefits">

          <div className="benefit">
            <span>🎂</span>
            <p>{t("birthdayRewards", "Birthday Rewards")}</p>
          </div>

          <div className="benefit">
            <span>🎁</span>
            <p>{t("exclusiveOffers", "Exclusive Family Offers")}</p>
          </div>

          <div className="benefit">
            <span>👔</span>
            <p>{t("earlyAccess", "Early Access to New Arrivals")}</p>
          </div>

          <div className="benefit">
            <span>✨</span>
            <p>{t("festivalInvites", "Festival Invitations")}</p>
          </div>

        </div>

        {/* Join */}

        <button
          className="join-button"
          onClick={onJoin}
        >
          {t("joinFamily", "JOIN THE LUCK-G'S FAMILY")}
        </button>

        <p className="landing-footer">
          {t("registrationTime", "Registration takes less than 30 seconds")}
        </p>

        <button className="owner-login" onClick={onShowQr}>
          {t("showQr", "Show Customer Registration QR")}
        </button>

      </div>

    </div>
  );
}

export default Home;
