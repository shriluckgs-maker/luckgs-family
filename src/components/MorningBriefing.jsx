function MorningBriefing({ stats, insights }) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="morning-card">

      <div className="morning-top">

        <div>

          <span className="welcome-tag">

            👋 {greeting}, Rakesh

          </span>

          <h1>

            Ready to grow LUCK-G'S today?

          </h1>

          <p>

            {today}

          </p>

        </div>

      </div>

      <div className="morning-summary">

        <div className="summary-box">

          <h2>{stats.totalCustomers}</h2>

          <span>Total Customers</span>

        </div>

        <div className="summary-box">

          <h2>{stats.birthdaysToday}</h2>

          <span>Birthdays Today</span>

        </div>

        <div className="summary-box">

          <h2>{stats.newMembers}</h2>

          <span>New Members</span>

        </div>

        <div className="summary-box">
          <h2>{stats.whatsAppSent}/{stats.whatsAppQueued}</h2>
          <span>WhatsApp Sent / Queued</span>
        </div>

      </div>

      {insights.length > 0 && (

        <div className="focus-card">

          <h3>

            🎯 Today's Focus

          </h3>

          <p>

            {insights[0].message}

          </p>

          <strong>

            {insights[0].action}

          </strong>

        </div>

      )}

    </div>

  );

}

export default MorningBriefing;
