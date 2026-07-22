import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

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

    <div className="contacts-section">

      <h2>📞 Today's Contacts</h2>

      {customers.length === 0 ? (

        <div className="contact-card">

          <h3>🎉 Great!</h3>

          <p>No birthdays today.</p>

        </div>

      ) : (

        customers.map(customer => (

          <div
            key={customer.id}
            className="contact-card"
          >

            <div>

              <h3>{customer.name}</h3>

              <p>🎂 Birthday Today</p>

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

              💬 Wish

            </button>

          </div>

        ))

      )}

    </div>

  );

}

export default TodaysContacts;