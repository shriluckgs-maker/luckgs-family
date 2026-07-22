import {
  Gift,
  Users,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function ActionCenter({ stats }) {
  const actions = [
    {
      icon: <Gift size={24} />,
      title: "Birthday Wishes",
      description: `${stats.birthdaysToday} customer(s) have birthdays today.`,
      button: "Open",
      color: "#EC4899",
    },
    {
      icon: <Users size={24} />,
      title: "Customer Directory",
      description: "View and manage all registered families.",
      button: "Customers",
      color: "#2563EB",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "WhatsApp Campaign",
      description: "Send festival offers and promotional messages.",
      button: "Start",
      color: "#22C55E",
    },
    {
      icon: <Sparkles size={24} />,
      title: "AI Business Assistant",
      description: "See today's smart recommendations.",
      button: "View",
      color: "#D4AF37",
    },
  ];

  return (
    <section className="action-center">

      <div className="section-header">
        <div>
          <h2>Today's Action Centre</h2>
          <p>Your most important business tasks for today.</p>
        </div>
      </div>

      <div className="action-grid">

        {actions.map((action, index) => (
          <div className="action-card" key={index}>

            <div
              className="action-icon"
              style={{
                background: `${action.color}15`,
                color: action.color,
              }}
            >
              {action.icon}
            </div>

            <div className="action-content">

              <h3>{action.title}</h3>

              <p>{action.description}</p>

            </div>

            <button className="action-btn">

              {action.button}

              <ArrowRight size={16} />

            </button>

          </div>
        ))}

      </div>

    </section>
  );
}

export default ActionCenter;