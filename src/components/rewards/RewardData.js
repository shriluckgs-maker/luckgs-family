export const defaultRewards = [
  { title: "Better Luck Next Time", emoji: "\u{1F60A}", coupon: "", probability: 50, color: "#BDBDBD", isActive: true, sortOrder: 1 },
  { title: "FREE SOCKS", emoji: "\u{1F9E6}", coupon: "SOCKS", probability: 20, color: "#2196F3", isActive: true, sortOrder: 2 },
  { title: "FREE HANDKERCHIEF", emoji: "\u{1F381}", coupon: "HANKY", probability: 15, color: "#4CAF50", isActive: true, sortOrder: 3 },
  { title: "5% DISCOUNT", emoji: "\u{1F389}", coupon: "DISC5", probability: 10, color: "#FF9800", isActive: true, sortOrder: 4 },
  { title: "KILLER DEODORANT", emoji: "\u{1F9F4}", coupon: "KILLER-DEO", probability: 5, color: "#9C27B0", isActive: true, sortOrder: 5 },
];

export function pickReward(rewards) {
  const availableRewards = rewards.filter((reward) => reward.isActive !== false);
  const random = Math.random() * 100;
  let total = 0;
  for (const reward of availableRewards) {
    total += Number(reward.probability) || 0;
    if (random <= total) return reward;
  }
  return availableRewards[0] || defaultRewards[0];
}
