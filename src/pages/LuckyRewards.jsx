import { useEffect, useState } from "react";
import "./luckyRewards.css";

import RewardWheel from "../components/rewards/RewardWheel";
import RewardPopup from "../components/rewards/RewardPopup";
import { hasActiveRewardPass } from "../services/rewardPassService";

function LuckyRewards({ customer, onBack }) {
  const [reward, setReward] = useState(null);
  const [checking, setChecking] = useState(true);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    async function checkRewardPass() {
      if (!customer) {
        setChecking(false);
        return;
      }

      try {
        const exists = await hasActiveRewardPass(customer.id);
        setAlreadyClaimed(exists);
      } catch (error) {
        console.error("Error checking Reward Pass:", error);
      } finally {
        setChecking(false);
      }
    }

    checkRewardPass();
  }, [customer]);

  function handleWin(winner) {
    setReward(winner);
  }

  return (
    <div className="lucky-page">
      <div className="lucky-card">

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Home
        </button>

        <h1>🎡 LUCK-G'S Lucky Rewards</h1>

        <p className="subtitle">
          Every new member receives one exclusive Reward Pass.
        </p>

        {customer && (
          <div
            style={{
              marginTop: 20,
              marginBottom: 25,
              padding: 15,
              background: "#FFF8E8",
              border: "2px solid #D4AF37",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#6B1525",
                marginBottom: 8,
              }}
            >
              Welcome,
            </h2>

            <h2
              style={{
                color: "#D4AF37",
                margin: 0,
              }}
            >
              {customer.name}
            </h2>

            <p
              style={{
                marginTop: 10,
                color: "#666",
              }}
            >
              Spin the wheel and unlock your exclusive Reward Pass.
            </p>
          </div>
        )}

        {checking ? (
          <div
            style={{
              marginTop: 30,
              textAlign: "center",
              color: "#6B1525",
              fontWeight: "bold",
            }}
          >
            Checking Reward Pass...
          </div>
        ) : alreadyClaimed ? (
          <div
            style={{
              marginTop: 25,
              padding: 25,
              background: "#FFF5F5",
              border: "2px solid #D9534F",
              borderRadius: 15,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#D9534F" }}>
              🎁 Reward Already Claimed
            </h2>

            <p>
              You have already claimed your
              <strong> LUCK-G'S Reward Pass.</strong>
            </p>

            <p>
              Thank you for being part of the
              <strong> LUCK-G'S Family Club ❤️</strong>
            </p>

            <button
              className="close-btn"
              onClick={onBack}
              style={{ marginTop: 20 }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <RewardWheel onWin={handleWin} />
        )}

      </div>

      <RewardPopup
        reward={reward}
        customer={customer}
        onClose={() => {
          setReward(null);
          onBack();
        }}
      />
    </div>
  );
}

export default LuckyRewards;