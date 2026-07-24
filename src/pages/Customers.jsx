import { useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot, writeBatch } from "firebase/firestore";
import {
  ArrowLeft,
  Search,
  Users,
  Cake,
  Phone,
  CalendarDays,
  MapPin,
  RefreshCw,
  Trash2,
  UserPlus,
  Download,
} from "lucide-react";

import { db } from "../firebase/firebaseConfig";
import { normalizeIndianMobile } from "../utils/mobileNumber";
import { saveAllCustomerContacts, saveCustomerContact } from "../utils/contactExport";

import "./customers.css";

import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

function Customers({ onBack, 
  onView,
onRegister,
 }) {

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loadError, setLoadError] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "customers"),
      (snapshot) => {
        setCustomers(snapshot.docs.map((customerDoc) => ({ id: customerDoc.id, ...customerDoc.data() })));
        setLoadError("");
        setLoading(false);
      },
      (error) => {
        console.error("Customer directory error:", error);
        setLoadError("We could not load customers. Check your internet connection and try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function deleteCustomer(customer) {
    if (!window.confirm(`Delete ${customer.name || "this customer"}? This cannot be undone.`)) return;

    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, "customers", customer.id));
      const mobile = normalizeIndianMobile(customer.mobile || customer.phone);
      if (mobile) batch.delete(doc(db, "customerMobiles", mobile));
      await batch.commit();
    } catch (error) {
      console.error("Unable to delete customer:", error);
      setLoadError("Unable to delete this customer. Please try again.");
    }
  }

  function downloadAllContacts() {
    const count = saveAllCustomerContacts(customers);
    setContactMessage(
      count > 0
        ? `${count} contact${count === 1 ? "" : "s"} downloaded. Open the file and choose Import or Add Contacts.`
        : "No customers with valid mobile numbers are available to export."
    );
  }

  function downloadContact(customer) {
    saveCustomerContact(customer);
    const place = customer.place || customer.town;
    setContactMessage(
      `${customer.name || "Customer"}${place ? ` - ${place}` : ""} is ready. Open the downloaded contact and tap Save.`
    );
  }

  const filteredCustomers = useMemo(() => {

    return customers.filter((customer) => {

      const name = (customer.name || "").toLowerCase();
      const mobile = normalizeIndianMobile(customer.mobile || customer.phone || "");

      return (
        name.includes(search.toLowerCase()) ||
        mobile.includes(search)
      );

    });

  }, [customers, search]);

  const birthdayCount = useMemo(() => {

    const month = new Date().getMonth();

    return customers.filter((customer) => {

      if (!customer.birthday) return false;

      return (
        new Date(customer.birthday).getMonth() === month
      );

    }).length;

  }, [customers]);

  if (loading) {
    return (
      <Loader text="Loading customers..." />
    );
  }

  if (loadError) {
    return (
      <div className="customers-page"><div className="customers-container directory-error">
        <h1>Customer Directory</h1>
        <p>{loadError}</p>
        <button className="back-btn" onClick={() => window.location.reload()}><RefreshCw size={18} /> Try Again</button>
      </div></div>
    );
  }

  return (

  <div className="customers-page">

    <div className="customers-container">

      <div className="customers-header">

        <div className="directory-toolbar">
          <button
            className="back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <button
            className="download-contacts-btn"
            type="button"
            onClick={downloadAllContacts}
            disabled={customers.length === 0}
          >
            <Download size={18} />
            Download All Contacts
          </button>
        </div>

        <div>
          <h1>Customer Directory</h1>

          <p>
            Manage all registered families at LUCK-G'S AI.
          </p>
        </div>

      </div>

      {contactMessage && (
        <div className="contact-download-message" role="status">
          <UserPlus size={18} />
          <span>{contactMessage}</span>
          <button type="button" onClick={() => setContactMessage("")}>Dismiss</button>
        </div>
      )}

      {/* Summary Cards */}

      <div className="summary-grid">

        <div className="summary-card">
          <Users size={28} />

          <h2>{customers.length}</h2>

          <span>Total Customers</span>
        </div>

        <div className="summary-card">
          <Cake size={28} />

          <h2>{birthdayCount}</h2>

          <span>Birthdays This Month</span>
        </div>

        <div className="summary-card">
          <Search size={28} />

          <h2>{filteredCustomers.length}</h2>

          <span>Search Results</span>
        </div>

      </div>

      {/* Search */}

      <div className="search-wrapper">

        <Search
          size={18}
          className="search-icon"
        />

        <input
          className="search-input"
          placeholder="Search by customer name or mobile number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Customer Table */}

      <div className="customer-table-wrapper">

        <table className="customer-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Mobile</th>

              <th>Place</th>

              <th>Birthday</th>

              <th>Anniversary</th>

              <th>Actions</th>

            </tr>

          </thead>

           <tbody>

  {filteredCustomers.length === 0 ? (

    <tr>
      <td colSpan={6}>

        <EmptyState
          icon="👥"
          title="No Customers Found"
          message="Start building your customer database by registering your first customer."
          action={
            <Button variant="primary"
            onClick={onRegister}>
              Register Customer
            </Button>
          }
        />

      </td>
    </tr>

  ) : (

    filteredCustomers.map((customer) => (

      <tr key={customer.id}>

        {/* Customer Name */}

        <td>

          <div className="customer-name">

            <div className="customer-avatar">

              {customer.name
                ? customer.name.charAt(0).toUpperCase()
                : "?"}

            </div>

            <span>{customer.name}</span>

          </div>

        </td>

        {/* Mobile */}

        <td>

          <div className="mobile-cell">

            <Phone size={15} />

            <span>{normalizeIndianMobile(customer.mobile || customer.phone) || "Not provided"}</span>

          </div>

        </td>

        {/* Birthday */}

        <td>

          <div className="date-cell">

            <MapPin size={15} />

            <span>{customer.place || customer.town || "-"}</span>

          </div>

        </td>

        {/* Birthday */}

        <td>

          <div className="date-cell">

            <Cake size={15} />

            <span>{customer.birthday || "-"}</span>

          </div>

        </td>

        {/* Anniversary */}

        <td>

          <div className="date-cell">

            <CalendarDays size={15} />

            <span>{customer.anniversary || "-"}</span>

          </div>

        </td>

        {/* Actions */}

        <td>

          <div className="table-actions">

            <button
              className="table-btn save-contact-btn"
              type="button"
              onClick={() => downloadContact(customer)}
              title={`Save ${customer.name || "customer"} to contacts`}
            >
              <UserPlus size={16} /> Save Contact
            </button>

            <button
              className="table-btn whatsapp-btn"
              onClick={() =>
                window.open(
                  `https://wa.me/91${customer.mobile}`,
                  "_blank"
                )
              }
            >
              WhatsApp
            </button>

            <button
              className="table-btn"
              onClick={() => onView(customer.id)}
            >
              View
            </button>

            <button
              className="table-btn delete-customer-btn"
              onClick={() => deleteCustomer(customer)}
              title={`Delete ${customer.name || "customer"}`}
            >
              <Trash2 size={16} /> Delete
            </button>

          </div>

        </td>

      </tr>

    ))

  )}

</tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Customers;
