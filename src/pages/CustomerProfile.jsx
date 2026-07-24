import { useEffect, useState } from "react";
import { doc, getDoc, writeBatch } from "firebase/firestore";

import {
  User,
  Phone,
  Cake,
  CalendarDays,
  MapPin,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { db } from "../firebase/firebaseConfig";
import { normalizeIndianMobile } from "../utils/mobileNumber";

import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

import "./customerProfile.css";

function CustomerProfile({
  customerId,
  onBack,
  onEdit,
}) {

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  async function loadCustomer() {

    try {

      const snap = await getDoc(
        doc(db, "customers", customerId)
      );

      if (snap.exists()) {

        setCustomer({
          id: snap.id,
          ...snap.data(),
        });

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  async function deleteCustomer() {

    if (!window.confirm("Delete this customer?"))
      return;

    const batch = writeBatch(db);
    batch.delete(doc(db, "customers", customer.id));
    const mobile = normalizeIndianMobile(customer.mobile || customer.phone);
    if (mobile) batch.delete(doc(db, "customerMobiles", mobile));
    await batch.commit();

    onBack();

  }

  if (loading) {
    return <Loader text="Loading customer..." />;
  }

  if (!customer) {
    return <Loader text="Customer not found..." />;
  }

  return (

<div className="profile-page">

  <div className="profile-container">

    <PageHeader
      title="Customer Profile"
      subtitle="Manage customer relationship"
      onBack={onBack}
    />

    <div className="profile-grid">

      <Card>

        <div className="profile-card">

          <div className="profile-avatar">
            <User size={60} />
          </div>

          <h2>{customer.name}</h2>

          <p className="member-since">
            Member Since
          </p>

          <span>
            {customer.createdAt || "Not Available"}
          </span>

          <div className="profile-details">

            <div className="profile-row">
              <Phone size={18} />
              <span>{normalizeIndianMobile(customer.mobile || customer.phone) || "Not provided"}</span>
            </div>

            <div className="profile-row">
              <MapPin size={18} />
              <span>{customer.place || customer.town || "Not provided"}</span>
            </div>

            <div className="profile-row">
              <Cake size={18} />
              <span>{customer.birthday || "-"}</span>
            </div>

            <div className="profile-row">
              <CalendarDays size={18} />
              <span>{customer.anniversary || "-"}</span>
            </div>

          </div>

        </div>

      </Card>

      <div className="profile-right">

  <Card>

    <h3>Quick Actions</h3>

    <div className="action-buttons">

      <Button
        variant="primary"
        onClick={() =>
          window.open(
            `https://wa.me/91${customer.mobile}`,
            "_blank"
          )
        }
      >
        <MessageCircle size={18} />
        WhatsApp
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          window.open(
            `tel:${customer.mobile}`
          )
        }
      >
        <Phone size={18} />
        Call
      </Button>

      <Button
        variant="primary"
        onClick={() => onEdit(customer.id)}
      >
        <Pencil size={18} />
        Edit
      </Button>

      <Button
        variant="danger"
        onClick={deleteCustomer}
      >
        <Trash2 size={18} />
        Delete
      </Button>

    </div>

  </Card>

  <Card>

    <h3>AI Recommendation</h3>

    <p className="ai-text">

      🎯 We recommend sending this customer
      your latest wedding collection catalogue.

    </p>

  </Card>
  <Card>

  <h3>Activity Timeline</h3>

  <div className="timeline">

    <div className="timeline-item">

      <div className="timeline-dot"></div>

      <div>

        <h4>Customer Registered</h4>

        <p>
          Customer profile created successfully.
        </p>

      </div>

    </div>

    <div className="timeline-item">

      <div className="timeline-dot"></div>

      <div>

        <h4>Birthday Reminder</h4>

        <p>
          Birthday wishes will automatically appear here.
        </p>

      </div>

    </div>

    <div className="timeline-item">

      <div className="timeline-dot"></div>

      <div>

        <h4>Future Activity</h4>

        <p>
          WhatsApp campaigns, follow-ups, purchases and AI recommendations will appear here.
        </p>

      </div>

    </div>

  </div>

</Card>

</div>

    </div>

  </div>

</div>

);

}

export default CustomerProfile;
