import { TrendingUp } from "lucide-react";

function DashboardCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="kpi-card">

      <div className="kpi-header">

        <div className="kpi-icon">
          {icon}
        </div>

        <TrendingUp
          size={18}
          className="kpi-trend"
        />

      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div className="kpi-title">
        {title}
      </div>

      <div className="kpi-subtitle">
        {subtitle}
      </div>

    </div>
  );
}

export default DashboardCard;