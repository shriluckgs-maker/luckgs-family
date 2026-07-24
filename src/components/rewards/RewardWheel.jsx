import { useEffect, useState } from "react";
import { pickReward } from "./RewardData";
import { getSpinRewards } from "../../services/spinRewardService";
import { rewardTitle, translate } from "../../utils/i18n";

function RewardWheel({ language, onWin, logo }) {
  const t = (key, english) => language === "kn" ? translate(language, key) : english;
  const [spinning, setSpinning] = useState(false);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    getSpinRewards().then(setRewards).catch(() => setRewards([]));
  }, []);

  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setTimeout(async () => {
      await onWin?.(pickReward(rewards));
      setSpinning(false);
    }, 3000);
  }

  return (
    <div className="reward-wheel">
      <div className={spinning ? "wheel spinning" : "wheel"}>
        <img src={logo} alt="LUCK-G'S" />
      </div>
      <p className="spin-note">{t("oneSpinOneReward", "ONE SPIN · ONE WELCOME REWARD")}</p>
      <button className="spin-btn" onClick={handleSpin} disabled={spinning}>
        {spinning ? t("choosingReward", "Choosing your reward...") : t("spinToReveal", "Spin to reveal")}
      </button>
      <div className="reward-list">
        {rewards.map((reward, index) => (
          <div key={reward.id} className="reward-item">
            <span>0{index + 1}</span>
            <p>{rewardTitle(language, reward.title)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardWheel;
