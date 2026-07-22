import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import PageHeader from "../components/ui/PageHeader";
import Loader from "../components/ui/Loader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { db } from "../firebase/firebaseConfig";

import "./birthdayCentre.css";

function BirthdayCentre({ onBack }) {
  const [loading, setLoading] = useState(true);
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const snapshot = await getDocs(collection(db, "customers"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Today's Birthdays
      const todays = data.filter((customer) => {
        if (!customer.birthday) return false;

        const birthday = new Date(customer.birthday);

        return (
          birthday.getDate() === today.getDate() &&
          birthday.getMonth() === today.getMonth()
        );
      });

      setTodayBirthdays(todays);

      // Upcoming Birthdays
      const upcoming = data
        .map((customer) => {
          if (!customer.birthday) return null;

          const birthday = new Date(customer.birthday);
          const nextBirthday = new Date(birthday);

          nextBirthday.setFullYear(today.getFullYear());
          nextBirthday.setHours(0, 0, 0, 0);

          if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
          }

          const diffDays = Math.floor(
            (nextBirthday - today) / (1000 * 60 * 60 * 24)
          );

          return {
            ...customer,
            daysLeft: diffDays,
          };
        })
        .filter(
          (customer) =>
            customer &&
            customer.daysLeft >= 1 &&
            customer.daysLeft <= 7
        )
        .sort((a, b) => a.daysLeft - b.daysLeft);

      setUpcomingBirthdays(upcoming);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function sendWhatsApp(customer) {
    const message =
      `Happy Birthday ${customer.name}! 🎉🎂\n\n` +
      `Wishing you a wonderful year ahead.\n\n` +
      `- Team LUCK-G'S`;

    const url = `https://wa.me/91${customer.mobile}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  }

  if (loading) {
    return <Loader text="Loading birthdays..." />;
  }

  return (
    <div className="birthday-page">
      <div className="birthday-container">
        <PageHeader
          title="Birthday Centre"
          subtitle="Wish customers and build stronger relationships."
          onBack={onBack}
        />

        <Card>
          <h2>🎂 Today's Birthdays</h2>

          <p>Total Birthdays Today: {todayBirthdays.length}</p>

          {todayBirthdays.length === 0 ? (
            <p>No birthdays today.</p>
          ) : (
            todayBirthdays.map((customer) => (
              <div key={customer.id} className="birthday-card">
                <h3>{customer.name}</h3>

                <p>📱 {customer.mobile}</p>

                <Button onClick={() => sendWhatsApp(customer)}>
                  💬 Wish on WhatsApp
                </Button>
              </div>
            ))
          )}
        </Card>

        <Card>
          <h2>📅 Upcoming Birthdays (Next 7 Days)</h2>

          <p>Total Upcoming: {upcomingBirthdays.length}</p>

          {upcomingBirthdays.length === 0 ? (
            <p>No upcoming birthdays.</p>
          ) : (
            upcomingBirthdays.map((customer) => (
              <div key={customer.id} className="birthday-card">
                <h3>{customer.name}</h3>

                <p>📱 {customer.mobile}</p>

                <p>
                  🎂 Birthday in <strong>{customer.daysLeft}</strong>{" "}
                  {customer.daysLeft === 1 ? "day" : "days"}
                </p>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}

export default BirthdayCentre;