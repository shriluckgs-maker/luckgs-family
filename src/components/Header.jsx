function Header({ businessHealth }) {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return (

    <div className="dashboard-header">

      <div className="header-top">

        <div>

          <h1>
            👋 Good Morning, Rakesh
          </h1>

          <p className="header-date">
            {today.toLocaleDateString("en-IN", options)}
          </p>

        </div>

        <div className="health-card">

          <span className="health-title">
            Business Health
          </span>

          <span className="health-score">
            ⭐ {businessHealth.score}%
          </span>

          <small>
            {businessHealth.message}
          </small>

        </div>

      </div>

    </div>

  );

}

export default Header;