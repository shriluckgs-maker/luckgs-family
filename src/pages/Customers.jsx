import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./home.css";

function Customers({ onBack }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

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

      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const name = (customer.name || "").toLowerCase();
    const mobile = customer.mobile || "";

    return (
      name.includes(search.toLowerCase()) ||
      mobile.includes(search)
    );
  });

  return (
    <div className="home">
      <div className="card" style={{ maxWidth: "1000px" }}>

        <button
          className="dashboard-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <h1>👥 Customer List</h1>

        <input
          className="search-box"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Birthday</th>
              <th>Anniversary</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="4">No Customers Found</td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.mobile}</td>
                  <td>{customer.birthday}</td>
                  <td>{customer.anniversary || "-"}</td>
                </tr>
              ))
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Customers;