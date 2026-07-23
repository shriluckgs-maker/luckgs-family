import {
  UserPlus,
  Users,
  Cake,
  BarChart3,
  Gift,
  ArrowRight,
} from "lucide-react";

function QuickActions({
  onAddCustomer,
  onCustomers,
  onBirthday,
  onRewardPasses,
  onReports,
}) {
  const actions = [
    {
      title: "Add Customer",
      subtitle: "Register a new family",
      icon: <UserPlus size={28} />,
      color: "#22C55E",
      action: onAddCustomer,
    },
    {
      title: "Customers",
      subtitle: "View customer directory",
      icon: <Users size={28} />,
      color: "#2563EB",
      action: onCustomers,
    },
    {
      title: "Birthdays",
      subtitle: "Today's celebrations",
      icon: <Cake size={28} />,
      color: "#EC4899",
      action: onBirthday,
    },
    {
      title: "Reward Passes",
      subtitle: "Redeem & manage rewards",
      icon: <Gift size={28} />,
      color: "#F59E0B",
      action: onRewardPasses,
    },
    {
      title: "Reports",
      subtitle: "Business analytics",
      icon: <BarChart3 size={28} />,
      color: "#8B5CF6",
      action: onReports,
    },
  ];

  return (
    <section className="quick-actions">
      <div className="section-header">
        <div>
          <h2>Quick Actions</h2>
          <p>Open your most-used modules in one click.</p>
        </div>
      </div>

      <div className="quick-grid">
        {actions.map((item, index) => (
          <button
            key={index}
            className="quick-card"
            onClick={item.action}
          >
            <div
              className="quick-icon"
              style={{
                background: `${item.color}15`,
                color: item.color,
              }}
            >
              {item.icon}
            </div>

            <div className="quick-content">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>

            <ArrowRight size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;