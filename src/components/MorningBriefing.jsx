function MorningBriefing({ stats, insights }) {

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (

    <div className="briefing-card">

      <h2>
        👋 {greeting()}, Rakesh
      </h2>

      <p>

        Today you have

        <strong> {stats.birthdaysToday} birthday(s)</strong>

        and

        <strong> {stats.totalCustomers} total members</strong>.

      </p>

      {insights.length > 0 && (

        <div className="briefing-tip">

          💡 <strong>Today's Focus</strong>

          <br /><br />

          {insights[0].action}

        </div>

      )}

    </div>

  );

}

export default MorningBriefing;