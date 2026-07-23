import "./RewardPass.css";

function RewardPass({
  customerName,
  reward,
  rewardPassId,
  validTill,
}) {
  return (
    <div className="reward-pass">

      <div className="reward-header">
        <h2>LUCK-G'S</h2>
        <p>FAMILY CLUB</p>
      </div>

      <div className="reward-title">
        🎁 REWARD PASS
      </div>

      <div className="reward-body">

        <h1>{reward.emoji}</h1>

        <h2>{reward.title}</h2>

        <div className="reward-id">
          <span>Reward Pass ID</span>
          <strong>{rewardPassId}</strong>
        </div>

        <div className="reward-member">
          <span>Member</span>
          <strong>{customerName}</strong>
        </div>

        <div className="reward-valid">
          <span>Valid Till</span>
          <strong>{validTill}</strong>
        </div>

      </div>

      <div className="reward-footer">
        Show this Reward Pass
        <br />
        at the LUCK-G'S Billing Counter
      </div>

    </div>
  );
}

export default RewardPass;