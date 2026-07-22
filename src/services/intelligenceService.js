// src/services/intelligenceService.js

export function calculateCustomerScore(customer) {

  let score = 0;

  if (customer.name) score += 20;
  if (customer.mobile) score += 20;
  if (customer.birthday) score += 20;
  if (customer.anniversary) score += 10;
  if (customer.joinedOn) score += 10;

  return Math.min(score, 100);
}

export function getCustomerStatus(score) {

  if (score >= 90) return {
    label: "Gold Customer",
    color: "#D4AF37"
  };

  if (score >= 70) return {
    label: "Active Customer",
    color: "#28a745"
  };

  if (score >= 40) return {
    label: "Regular Customer",
    color: "#007bff"
  };

  return {
    label: "Needs Follow-up",
    color: "#dc3545"
  };

}

export function calculateBusinessHealth(customers) {

  if (!customers.length) {
    return {
      score: 0,
      message: "No customer data available"
    };
  }

  const total = customers.reduce(
    (sum, customer) => sum + calculateCustomerScore(customer),
    0
  );

  const score = Math.round(total / customers.length);

  let message = "Healthy customer database";

  if (score < 50)
    message = "Customer data needs improvement";

  else if (score > 80)
    message = "Excellent customer engagement";

  return {
    score,
    message
  };
}

export function generateDailyInsights(customers) {

  const insights = [];

  const today = new Date();

  const birthdays = customers.filter((customer) => {

    if (!customer.birthday) return false;

    const birthday = new Date(customer.birthday);

    return (
      birthday.getDate() === today.getDate() &&
      birthday.getMonth() === today.getMonth()
    );
  });

  if (birthdays.length) {

    insights.push({
      priority: 1,
      title: "🎂 Birthday Opportunity",
      message: `${birthdays.length} customer(s) have birthdays today.`,
      action: "Wish them before noon.",
      customers: birthdays
    });

  } else {

    insights.push({
      priority: 1,
      title: "👥 Customer Growth",
      message: "No birthdays today.",
      action: "Register at least 5 new families."
    });

  }

  insights.push({
    priority: 2,
    title: "🎯 Daily Target",
    message: "Contact at least 5 customers today.",
    action: "Build stronger relationships."
  });

  return insights;
}