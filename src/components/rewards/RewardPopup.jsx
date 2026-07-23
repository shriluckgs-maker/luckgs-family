import { useEffect, useMemo, useRef } from "react";
import { generateRewardPassId } from "../../utils/rewardPassGenerator";
import { saveRewardPass } from "../../services/rewardPassService";

function RewardPopup({ reward, customer, onClose }) {

  // Hooks must always run
  const rewardPassId = useMemo(() => {
    if (!reward || !reward.coupon) return "";
    return generateRewardPassId();
  }, [reward]);

  const validTill = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  // Prevent duplicate Firestore writes
  const savedRef = useRef(false);

  useEffect(() => {
    async function savePass() {
      if (
        !reward ||
        !customer ||
        !rewardPassId ||
        savedRef.current
      )
        return;

      savedRef.current = true;

      try {
        await saveRewardPass({
          rewardPassId,
          customerId: customer.id,
          customerName: customer.name,
          mobile: customer.mobile,
          reward: reward.title,
        });

        console.log("✅ Reward Pass saved");
      } catch (err) {
        console.error(err);
      }
    }

    savePass();
  }, [reward, customer, rewardPassId]);

  // Safe to return after hooks
  if (!reward) return null;

  const whatsappMessage = `🎉 Congratulations ${customer?.name ?? ""}!

Welcome to the LUCK-G'S Family Club.

🎁 Reward
${reward.emoji} ${reward.title}

🎟 Reward Pass ID
${rewardPassId}

📅 Valid Till
${validTill}

Show this Reward Pass at the LUCK-G'S billing counter.

Thank you for being part of the LUCK-G'S Family!`;

  function sendWhatsApp() {
    window.open(
      "https://wa.me/?text=" +
        encodeURIComponent(whatsappMessage),
      "_blank"
    );
  }

  function shareWin() {
    const message = `🎉 I just won ${reward.emoji} ${reward.title} at LUCK-G'S Lucky Rewards!

Join the LUCK-G'S Family Club today!

https://retailboost-ai.web.app`;

    window.open(
      "https://wa.me/?text=" +
        encodeURIComponent(message),
      "_blank"
    );
  }

  return (
    <div className="reward-popup">
      <div className="popup-card">

        <h1>🎉 Congratulations!</h1>

        <div className="popup-emoji">
          {reward.emoji}
        </div>

        <h2>{reward.title}</h2>

        {rewardPassId && (
          <>
            <h3>🎁 Reward Pass ID</h3>

            <div className="coupon-box">
              {rewardPassId}
            </div>

            <p
              style={{
                marginTop: 15,
                color: "#666",
                fontWeight: 600,
              }}
            >
              Valid Till : {validTill}
            </p>
          </>
        )}

        <div className="popup-buttons">

          <button
            className="whatsapp-btn"
            onClick={sendWhatsApp}
          >
            💬 Send to WhatsApp
          </button>

          <button
            className="share-btn"
            onClick={shareWin}
          >
            📲 Share My Win
          </button>

          <button
            className="close-btn"
            onClick={onClose}
          >
            Continue
          </button>

        </div>

      </div>
    </div>
  );
}

export default RewardPopup;