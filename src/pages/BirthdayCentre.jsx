import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./home.css";

function BirthdayCentre({ onBack }) {

  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {

    loadBirthdays();

  }, []);

  async function loadBirthdays() {

    const snapshot = await getDocs(collection(db, "customers"));

    const today = new Date();

    const data = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(customer => {

        if (!customer.birthday) return false;

        const birthday = new Date(customer.birthday);

        return (
          birthday.getDate() === today.getDate() &&
          birthday.getMonth() === today.getMonth()
        );

      });

    setBirthdays(data);

  }

  return (

    <div className="home">

      <div className="card">

        <button
          className="dashboard-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <h1>🎂 Birthday Centre</h1>

        {birthdays.length === 0 ? (

          <p>No birthdays today.</p>

        ) : (

          birthdays.map(customer => (

            <div
              className="benefit-card"
              key={customer.id}
            >

              <h3>{customer.name}</h3>

              <p>{customer.mobile}</p>

              <button
                className="dashboard-btn"
                onClick={() =>
                  window.open(
                    `https://wa.me/91${customer.mobile}`,
                    "_blank"
                  )
                }
              >
                💬 Send WhatsApp Wish
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default BirthdayCentre;