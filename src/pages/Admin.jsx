import { useEffect, useState } from "react";
import "./home.css";

import Header from "../components/Header";
import DashboardGrid from "../components/DashboardGrid";
import ActionCenter from "../components/ActionCenter";
import AIInsights from "../components/AIInsights";
import QuickActions from "../components/QuickActions";
import TodaysContacts from "../components/TodaysContacts";
import MorningBriefing from "../components/MorningBriefing";

import { getCustomers } from "../services/customerService";

import {
  calculateBusinessHealth,
  generateDailyInsights,
} from "../services/intelligenceService";

function Admin({ onCustomers, onBirthday }) {

  const [stats, setStats] = useState({
    totalCustomers: 0,
    birthdaysToday: 0,
    upcomingBirthdays: 0,
    newMembers: 0,
  });

  const [businessHealth, setBusinessHealth] = useState({
    score: 0,
    message: "",
  });

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

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
      newMembers: customers.length,
    });

    setBusinessHealth(
      calculateBusinessHealth(customers)
    );

    setInsights(
      generateDailyInsights(customers)
    );

  }

  return (

    <div className="container fade">

      <div className="dashboard">
        <MorningBriefing

    stats={stats}

    insights={insights}

/>

<Header
    businessHealth={businessHealth}
/>

    

        <DashboardGrid
          stats={stats}
        />

        <ActionCenter
          stats={stats}
        />

        <AIInsights
          insights={insights}
        />

        <TodaysContacts />

        <QuickActions
          onAddCustomer={() => {}}
          onCustomers={onCustomers}
          onBirthday={onBirthday}
          onReports={() => {}}
        />

      </div>

    </div>

  );

}

export default Admin;