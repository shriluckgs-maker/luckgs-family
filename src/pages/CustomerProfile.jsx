import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./customerProfile.css";
import CustomerTimeline from "../components/customer/CustomerTimeline";
import Loader from "../components/ui/Loader";

function CustomerProfile({ customerId, onBack, onEdit }) {

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {

    const snap = await getDoc(
      doc(db, "customers", customerId)
    );

    if (snap.exists()) {

      setCustomer({
        id: snap.id,
        ...snap.data()
      });

    }

  }

  async function deleteCustomer() {

    if (!window.confirm("Delete customer?"))
      return;

    await deleteDoc(
      doc(db, "customers", customerId)
    );

    onBack();

  }

  if (!customer) {

    return (
      <Loader
      text="Loading customer profile..."
      size="large"
       />
    );

  }

  return (

    <div className="home">

      <div className="card">

        <h1>👤 Customer Profile</h1>

        <div className="benefit-card">
          <strong>Name</strong>
          <br />
          {customer.name}
        </div>

        <div className="benefit-card">
          <strong>Mobile</strong>
          <br />
          {customer.mobile}
        </div>

        <div className="benefit-card">
          <strong>Birthday</strong>
          <br />
          {customer.birthday}
        </div>

        <div className="benefit-card">
          <strong>Anniversary</strong>
          <br />
          {customer.anniversary || "-"}
          <CustomerTimeline
    customer={customer}
/>
        </div>

        <button
          className="dashboard-btn"
          onClick={() =>
            window.open(
              `https://wa.me/91${customer.mobile}`,
              "_blank"
            )
          }
        >
          💬 WhatsApp
        </button>

        <button
          className="dashboard-btn"
          onClick={() =>
            window.location.href =
              `tel:${customer.mobile}`
          }
        >
          📞 Call
        </button>

        <button
          className="dashboard-btn"
          onClick={() =>
            onEdit(customer.id)
          }
        >
          ✏ Edit
        </button>

        <button
          className="dashboard-btn"
          onClick={deleteCustomer}
        >
          🗑 Delete
        </button>

        <button
          className="dashboard-btn"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>

    </div>

  );

}

export default CustomerProfile;