const rewards = [
  {
    id: 1,
    title: "Better Luck Next Time",
    emoji: "😊",
    coupon: "",
    probability: 50,
    color: "#BDBDBD",
  },

  {
    id: 2,
    title: "FREE SOCKS",
    emoji: "🧦",
    coupon: "SOCKS",
    probability: 20,
    color: "#2196F3",
  },

  {
    id: 3,
    title: "FREE HANDKERCHIEF",
    emoji: "🎁",
    coupon: "HANKY",
    probability: 15,
    color: "#4CAF50",
  },

  {
    id: 4,
    title: "5% DISCOUNT",
    emoji: "🎉",
    coupon: "DISC5",
    probability: 10,
    color: "#FF9800",
  },

  {
    id: 5,
    title: "₹250 SHOPPING VOUCHER",
    emoji: "👔",
    coupon: "V250",
    probability: 5,
    color: "#9C27B0",
  },
];

export default rewards;
export function pickReward() {

  const random = Math.random() * 100;

  let total = 0;

  for (const reward of rewards) {

    total += reward.probability;

    if (random <= total) {

      return reward;

    }

  }

  return rewards[0];
}