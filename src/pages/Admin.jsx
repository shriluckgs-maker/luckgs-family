import { useEffect, useState } from "react";
import "./home.css";
import "./admin.css";
import { RefreshCw, ShieldCheck } from "lucide-react";
import logo from "../assets/logo.jpeg";

import DashboardGrid from "../components/DashboardGrid";
import ActionCenter from "../components/ActionCenter";
import AIInsights from "../components/AIInsights";
import QuickActions from "../components/QuickActions";
import TodaysContacts from "../components/TodaysContacts";
import MorningBriefing from "../components/MorningBriefing";

import { getCustomers, getOnboardingStats } from "../services/customerService";

import {
  calculateBusinessHealth,
  generateDailyInsights,
} from "../services/intelligenceService";

function Admin({
  onCustomers,
  onBirthday,
  onRewardPasses,
  onManageRewards,
  onRegister,
}) {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    birthdaysToday: 0,
    upcomingBirthdays: 0,
    newMembers: 0,
    whatsAppSent: 0,
    whatsAppQueued: 0,
    whatsAppFailed: 0,
  });

  const [businessHealth, setBusinessHealth] = useState({
    score: 0,
    message: "",
  });

  const [insights, setInsights] = useState([]);

  async function loadDashboard() {
    try {
      const customers = await getCustomers();

      const today = new Date();

      let birthdaysToday = 0;

      customers.forEach((customer) => {
        if (!customer.birthday) return;

        const birthday = new Date(customer.birthday);

        if (
          birthday.getDate() === today.getDate() &&
          birthday.getMonth() === today.getMonth()
        ) {
          birthdaysToday++;
        }
      });

      setStats({
        totalCustomers: customers.length,
        birthdaysToday,
        upcomingBirthdays: 0,
        newMembers: customers.filter((customer) => {
          const joined = new Date(customer.joinedOn);
          return joined.toDateString() === today.toDateString();
        }).length,
        ...getOnboardingStats(customers),
      });

      setBusinessHealth(
        calculateBusinessHealth(customers)
      );

      setInsights(
        generateDailyInsights(customers)
      );

    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  }

  useEffect(() => {
    // Dashboard values are loaded once from Firestore when this page opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, []);

  return (
    <main className="admin-page fade">
      <div className="admin-shell">
        <header className="admin-topbar">
          <div className="admin-brand">
            <img src={logo} alt="LUCK-G'S" />
            <div>
              <span><ShieldCheck size={13} /> ADMIN WORKSPACE</span>
              <strong>LUCK-G'S Family</strong>
            </div>
          </div>

          <button className="admin-refresh" type="button" onClick={loadDashboard}>
            <RefreshCw size={17} />
            <span>Refresh</span>
          </button>
        </header>

        <div className="dashboard">
          <MorningBriefing
            stats={stats}
            insights={insights}
            businessHealth={businessHealth}
          />

          <DashboardGrid
            stats={stats}
            businessHealth={businessHealth}
          />

          <ActionCenter
            stats={stats}
          />

          <AIInsights
            insights={insights}
          />

          <TodaysContacts />

          <QuickActions
            onAddCustomer={onRegister}
            onCustomers={onCustomers}
            onBirthday={onBirthday}
            onRewardPasses={onRewardPasses}
            onManageRewards={onManageRewards}
            onReports={() => {}}
          />
        </div>
      </div>
    </main>
  );
}

export default Admin;
