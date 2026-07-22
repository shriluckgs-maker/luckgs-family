import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  ArrowLeft,
  Search,
  Users,
  Cake,
  Phone,
  CalendarDays,
} from "lucide-react";

import { db } from "../firebase/firebaseConfig";

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

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {

    try {

      const snapshot = await getDocs(
        collection(db, "customers")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCustomers(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  const filteredCustomers = useMemo(() => {

    return customers.filter((customer) => {

      const name = (customer.name || "").toLowerCase();
      const mobile = customer.mobile || "";

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

  return (

  <div className="customers-page">

    <div className="customers-container">

      <div className="customers-header">

        <button
          className="back-btn"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div>
          <h1>Customer Directory</h1>

          <p>
            Manage all registered families at LUCK-G'S AI.
          </p>
        </div>

      </div>

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

              <th>Birthday</th>

              <th>Anniversary</th>

              <th>Actions</th>

            </tr>

          </thead>

           <tbody>

  {filteredCustomers.length === 0 ? (

    <tr>
      <td colSpan={5}>

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

            <span>{customer.mobile}</span>

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