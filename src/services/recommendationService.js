if (birthdayToday) {
   recommendation.push({
      type: "birthday",
      priority: 1,
      message: "Wish customer today"
   });
}

if (anniversaryToday) {
   recommendation.push({
      type: "anniversary",
      priority: 2,
      message: "Send anniversary wishes"
   });
}

if (newCustomer) {
   recommendation.push({
      type: "welcome",
      priority: 3,
      message: "Send welcome message"
   });
}