import DashboardCard from "./DashboardCard";

import {

  Users,

  Cake,

  UserPlus,

  ShieldCheck,
  MessageCircle,

} from "lucide-react";

function DashboardGrid({

  stats,

  businessHealth,

}) {

  return (

    <div className="dashboard-grid">

      <DashboardCard
        title="Members"
        value={stats.totalCustomers}
        subtitle="Registered Families"
        icon={<Users size={30} />}
        color="#2563EB"
      />

      <DashboardCard
        title="Today's Birthdays"
        value={stats.birthdaysToday}
        subtitle="Celebrate your customers"
        icon={<Cake size={30} />}
        color="#EC4899"
      />

      <DashboardCard
        title="New Members"
        value={stats.newMembers}
        subtitle="Growing every day"
        icon={<UserPlus size={30} />}
        color="#22C55E"
      />

      <DashboardCard
        title="Business Health"
        value={`${businessHealth.score}%`}
        subtitle={businessHealth.message}
        icon={<ShieldCheck size={30} />}
        color="#D4AF37"
      />

      <DashboardCard
        title="WhatsApp Welcome"
        value={stats.whatsAppSent}
        subtitle={`${stats.whatsAppQueued} queued · ${stats.whatsAppFailed} need attention`}
        icon={<MessageCircle size={30} />}
        color="#22C55E"
      />

    </div>

  );

}

export default DashboardGrid;
