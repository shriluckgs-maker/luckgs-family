import { useEffect, useMemo, useRef, useState } from "react";
import { generateRewardPassId } from "../../utils/rewardPassGenerator";
import { redeemCustomerReward, saveRewardPass } from "../../services/rewardPassService";
import { rewardTitle, translate } from "../../utils/i18n";

function RewardPopup({ language, reward, customer, onClose }) {
  const t = (key, english) => language === "kn" ? translate(language, key) : english;
  const rewardPassId = useMemo(() => {
    if (!reward) return "";
    return generateRewardPassId();
  }, [reward]);

  const validTill = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toLocaleDateString(language === "kn" ? "kn-IN" : "en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [language]);

  const savedRef = useRef(false);
  const [passReady, setPassReady] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function savePass() {
      if (!reward || !customer || !rewardPassId || savedRef.current) return;
      savedRef.current = true;
      try {
        const saved = await saveRewardPass({
          rewardPassId,
          customerId: customer.id,
          customerName: customer.name,
          mobile: customer.mobile,
          reward: reward.title,
        });
        setPassReady(saved);
        if (!saved) {
          setError(language === "kn"
            ? translate(language, "prepareFailed")
            : "We could not prepare this reward. Please try again.");
        }
      } catch (saveError) {
        console.error("Unable to save reward pass", saveError);
        setError(language === "kn"
          ? translate(language, "prepareFailed")
          : "We could not prepare this reward. Please try again.");
      }
    }
    savePass();
  }, [reward, customer, rewardPassId, language]);

  if (!reward) return null;

  async function handleRedeem() {
    if (!passReady || redeeming || redeemed) return;
    setRedeeming(true);
    setError("");

    try {
      const success = await redeemCustomerReward(rewardPassId);
      setRedeemed(true);
      if (!success) setError(t("alreadyRedeemed", "This reward has already been redeemed."));
    } catch (redeemError) {
      console.error("Unable to redeem reward", redeemError);
      setError(t("redemptionFailed", "Redemption failed. Please try again."));
    } finally {
      setRedeeming(false);
    }
  }

  return (
    <div className="reward-popup">
      <div className="popup-card">
        <h1>{t("congratulations", "Congratulations!")}</h1>
        <div className="popup-emoji">{reward.emoji}</div>
        <h2>{rewardTitle(language, reward.title)}</h2>
        <h3>{t("rewardPassId", "Reward Pass ID")}</h3>
        <div className="coupon-box">{rewardPassId}</div>
        <p style={{ marginTop: 15, color: "#666", fontWeight: 600 }}>
          {t("validTill", "Valid Till")}: {validTill}
        </p>
        {error && <p className="redeem-error" role="alert">{error}</p>}
        <div className="popup-buttons">
          {redeemed ? (
            <button className="redeemed-btn" type="button" disabled>
              ✓ {t("redeemed", "Redeemed")}
            </button>
          ) : (
            <button className="redeem-now-btn" type="button" onClick={handleRedeem} disabled={!passReady || redeeming}>
              {!passReady
                ? t("preparingReward", "Preparing Reward...")
                : redeeming
                  ? t("redeeming", "Redeeming...")
                  : t("redeemNow", "Redeem Now")}
            </button>
          )}
          {redeemed && (
            <button className="close-btn" type="button" onClick={onClose}>
              {t("continue", "Continue")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RewardPopup;
