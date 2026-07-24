import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Gift } from "lucide-react";
import logo from "../assets/logo.jpeg";
import "./luckyRewards.css";
import RewardWheel from "../components/rewards/RewardWheel";
import RewardPopup from "../components/rewards/RewardPopup";
import { claimLuckySpin, hasUsedLuckySpin } from "../services/luckySpinService";
import LanguageToggle from "../components/LanguageToggle";
import { translate } from "../utils/i18n";

function LuckyRewards({ language, onLanguageChange, customer, onBack }) {
  const t = (key, english) => language === "kn" ? translate(language, key) : english;
  const [reward, setReward] = useState(null);
  const [checking, setChecking] = useState(true);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    async function checkLuckySpin() {
      if (!customer) { setChecking(false); return; }
      try { setAlreadyClaimed(await hasUsedLuckySpin(customer.id)); }
      catch (error) { console.error("Error checking Lucky Spin:", error); }
      finally { setChecking(false); }
    }
    checkLuckySpin();
  }, [customer]);

  async function handleWin(winner) {
    try {
      const claimed = await claimLuckySpin(customer, winner);
      if (claimed) setReward(winner);
      else setAlreadyClaimed(true);
    } catch (error) {
      console.error("Error claiming Lucky Spin:", error);
    }
  }

  return (
    <div className="lucky-page">
      <LanguageToggle language={language} onChange={onLanguageChange} />
      <div className="lucky-card">
        <button className="lucky-back" onClick={onBack}><ArrowLeft size={17} /> Home</button>
        <header className="lucky-header">
          <img src={logo} alt="LUCK-G'S" className="lucky-logo" />
          <span className={language === "kn" ? "kannada-brand" : ""}>
            {language === "kn" ? "ಲಕ್-ಜಿ'ಸ್ ಕುಟುಂಬ ಕ್ಲಬ್" : "LUCK-G'S FAMILY CLUB"}
          </span>
          <h1>{t("oneSpinSurprise", "One spin. A little surprise.")}</h1>
          <p>{t("welcomeRewardReady", "Your welcome reward is ready to reveal.")}</p>
        </header>

        <section className="rewards-wallet" aria-label="Reward delivery status">
          <div className="wallet-icon"><Gift size={22} /></div>
          <div><span>{t("yourWheelReward", "YOUR WHEEL REWARD")}</span><strong>{t("spinToReveal", "Spin to reveal")}</strong></div>
          <div className="wallet-status"><CheckCircle2 size={16} /><span>{t("redeemAfterSpin", "Redeem after your spin")}</span></div>
        </section>
        <section className="rewards-explainer"><Gift size={20} /><p>{t("redeemInstruction", "After you spin, tap Redeem Now. Your reward will be marked as redeemed automatically.")}</p></section>

        {customer && (
          <div className="member-welcome">
            <img src={logo} alt="" className="member-logo" />
            <div><span>{t("welcomeFamily", "Welcome to the family")}</span><h2>{customer.name}</h2><p>{t("oneLuckySpin", "You have one lucky spin to unlock your welcome reward.")}</p></div>
          </div>
        )}

        {checking ? <div className="reward-checking">{t("preparingReward", "Preparing your reward...")}</div> : alreadyClaimed ? (
          <div className="claimed-message"><img src={logo} alt="LUCK-G'S" /><h2>{t("rewardClaimed", "Your welcome reward was claimed")}</h2><p>{t("thankYou", "Thank you for being part of the LUCK-G'S Family Club.")}</p><button className="close-btn" onClick={onBack}>{t("backHome", "Back to Home")}</button></div>
        ) : <RewardWheel language={language} onWin={handleWin} logo={logo} />}
      </div>
      <RewardPopup language={language} reward={reward} customer={customer} onClose={() => { setReward(null); onBack(); }} />
    </div>
  );
}

export default LuckyRewards;
