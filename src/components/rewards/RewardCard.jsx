

function RewardCard({
  pass,
  onView,
  onRedeem,
}) {
  const statusClass =
    pass.status === "ACTIVE"
      ? "status-active"
      : pass.status === "REDEEMED"
      ? "status-redeemed"
      : "status-expired";

  return (
    <div className="reward-card">

      <div className="reward-header">

        <div className="reward-id">
          🎟 {pass.rewardPassId}
        </div>

        <div
          className={`status-badge ${statusClass}`}
        >
          {pass.status}
        </div>

      </div>

      <div className="reward-body">

        <div className="reward-row">
          <span className="reward-label">
            👤 Customer
          </span>

          <span className="reward-value">
            {pass.customerName}
          </span>
        </div>

        <div className="reward-row">
          <span className="reward-label">
            📱 Mobile
          </span>

          <span className="reward-value">
            {pass.mobile}
          </span>
        </div>

        <div className="reward-row">
          <span className="reward-label">
            🎁 Reward
          </span>

          <span className="reward-value">
            {pass.reward}
          </span>
        </div>

        <div className="reward-row">
          <span className="reward-label">
            📅 Valid Till
          </span>

          <span className="reward-value">
            {pass.expiryDate
              ? new Date(
                  pass.expiryDate.seconds * 1000
                ).toLocaleDateString()
              : "--"}
          </span>
        </div>

      </div>

      <div className="reward-footer">

        <button
          className="reward-btn reward-btn-view"
          onClick={() => onView(pass)}
        >
          👁 View
        </button>

        {pass.status === "ACTIVE" ? (

          <button
            className="reward-btn reward-btn-redeem"
            onClick={() => onRedeem(pass)}
          >
            ✅ Redeem
          </button>

        ) : (

          <button
            className="reward-btn reward-btn-disabled"
            disabled
          >
            ✔ Redeemed
          </button>

        )}

      </div>

    </div>
  );
}

export default RewardCard;