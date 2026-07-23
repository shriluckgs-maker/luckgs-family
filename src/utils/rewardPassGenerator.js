// Generates a random string
function randomCharacters(length) {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
}

// Generates Reward Pass ID
export function generateRewardPassId() {
  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2);

  return `LG-RP-${year}-${randomCharacters(6)}`;
}