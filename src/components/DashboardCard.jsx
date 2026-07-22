import {
  Clock3,
} from "lucide-react";

function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  color = "#6B1525",
}) {

  const updatedTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (

    <div className="kpi-card">

      <div className="kpi-header">

        <div
          className="kpi-icon"
          style={{
            background: `${color}15`,
            color,
          }}
        >
          {icon}
        </div>

        <div className="kpi-live">

          <Clock3 size={14} />

          <span>
            Updated {updatedTime}
          </span>

        </div>

      </div>

      <div className="kpi-content">

        <h2 className="kpi-number">
          {value}
        </h2>

        <h3 className="kpi-title">
          {title}
        </h3>

        <p className="kpi-subtitle">
          {subtitle}
        </p>

      </div>

      <div className="kpi-footer">

        <div
          className="kpi-line"
          style={{
            background: color,
          }}
        />

      </div>

    </div>

  );

}

export default DashboardCard;