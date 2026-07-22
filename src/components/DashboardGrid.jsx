import DashboardCard from "./DashboardCard";

import {
  Users,
  Cake,
  UserPlus,
  Star,
} from "lucide-react";

function DashboardGrid({ stats }) {

  return (

    <div className="dashboard-grid">

      <DashboardCard
        title="Members"
        value={stats.totalCustomers}
        subtitle="Registered Customers"
        icon={<Users size={28} />}
      />

      <DashboardCard
        title="Birthdays"
        value={stats.birthdaysToday}
        subtitle="Today"
        icon={<Cake size={28} />}
      />

      <DashboardCard
        title="New Members"
        value={stats.newMembers}
        subtitle="This Month"
        icon={<UserPlus size={28} />}
      />

      <DashboardCard
        title="Business Score"
        value="92%"
        subtitle="Excellent"
        icon={<Star size={28} />}
      />

    </div>

  );

}

export default DashboardGrid;