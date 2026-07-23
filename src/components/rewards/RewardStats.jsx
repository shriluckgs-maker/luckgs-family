function RewardStats({ stats }) {
  const cards = [
    {
      title: "ACTIVE",
      value: stats.active,
      color: "#22C55E",
      icon: "🟢",
    },
    {
      title: "REDEEMED",
      value: stats.redeemed,
      color: "#EF4444",
      icon: "🔴",
    },
    {
      title: "EXPIRING",
      value: stats.expiring,
      color: "#F59E0B",
      icon: "⏰",
    },
    {
      title: "TOTAL",
      value: stats.total,
      color: "#2563EB",
      icon: "🎁",
    },
  ];

  return (
    <div className="reward-stats">

      {cards.map((card) => (

        <div
          key={card.title}
          className="reward-stat-card"
        >

          <div
            style={{
              fontSize: 30,
            }}
          >
            {card.icon}
          </div>

          <h2>{card.value}</h2>

          <p>{card.title}</p>

        </div>

      ))}

    </div>
  );
}

export default RewardStats;