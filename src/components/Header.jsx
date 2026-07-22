import { CalendarDays, Sparkles } from "lucide-react";

function Header({ businessHealth }) {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="header-card">

      <div className="header-left">

        <span className="brand-tag">
          LUCK-G'S AI
        </span>

        <h1>
          Customer Growth Platform
        </h1>

        <div className="header-date">

          <CalendarDays size={18} />

          <span>{date}</span>

        </div>

      </div>

      <div className="header-right">

        <div className="health-box">

          <Sparkles size={20} />

          <div>

            <small>Business Health</small>

            <h2>{businessHealth.score}%</h2>

            <p>{businessHealth.message}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;