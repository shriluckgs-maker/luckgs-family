import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import {
  Cake,
  Phone,
  MessageCircle,
  User,
} from "lucide-react";

function TodaysContacts() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {

    const snapshot = await getDocs(collection(db, "customers"));

    const today = new Date();

    const birthdayCustomers = snapshot.docs
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

    setCustomers(birthdayCustomers);

  }

  return (

    <section className="contacts-section">

      <div className="section-header">

        <div>

          <h2>Today's Contacts</h2>

          <p>Customers requiring your attention today.</p>

        </div>

      </div>

      {customers.length === 0 ? (

        <div className="contact-empty">

          <Cake size={42} />

          <h3>No Birthdays Today</h3>

          <p>
            Great! Use today to register new families
            and reconnect with existing customers.
          </p>

        </div>

      ) : (

        <div className="contacts-grid">

          {customers.map(customer => (

            <div
              key={customer.id}
              className="contact-card"
            >

              <div className="contact-avatar">

                <User size={28} />

              </div>

              <div className="contact-details">

                <h3>{customer.name}</h3>

                <p>

                  <Cake size={15} />

                  Birthday Today

                </p>

                <p>

                  <Phone size={15} />

                  {customer.mobile}

                </p>

              </div>

              <button
                className="contact-btn"
                onClick={() =>
                  window.open(
                    `https://wa.me/91${customer.mobile}`,
                    "_blank"
                  )
                }
              >

                <MessageCircle size={18} />

                WhatsApp

              </button>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default TodaysContacts;