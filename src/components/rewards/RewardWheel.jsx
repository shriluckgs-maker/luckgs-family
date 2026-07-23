import { useState } from "react";
import rewards, { pickReward } from "./RewardData";

function RewardWheel({ onWin }) {
  const [spinning, setSpinning] = useState(false);

  function handleSpin() {
    if (spinning) return;

    setSpinning(true);

    setTimeout(() => {
      const reward = pickReward();

      setSpinning(false);

      if (onWin) {
        onWin(reward);
      }
    }, 3000);
  }

  return (
    <div className="reward-wheel">

      <div className={spinning ? "wheel spinning" : "wheel"}>
        🎡
      </div>

      <button
        className="spin-btn"
        onClick={handleSpin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "🎡 SPIN NOW"}
      </button>

      <div className="reward-list">

        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="reward-item"
          >
            <span>{reward.emoji}</span>

            <p>{reward.title}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default RewardWheel;