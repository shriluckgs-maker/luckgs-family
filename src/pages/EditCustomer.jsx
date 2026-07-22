import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./home.css";

function EditCustomer({ customerId, onBack }) {

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    birthday: "",
    anniversary: ""
  });

  useEffect(() => {

    async function loadCustomer() {

      const snap = await getDoc(doc(db, "customers", customerId));

      if (snap.exists()) {
        setForm(snap.data());
      }

    }

    loadCustomer();

  }, [customerId]);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  async function handleSave(e) {

    e.preventDefault();

    await updateDoc(doc(db, "customers", customerId), form);

    alert("Customer Updated Successfully");

    onBack();

  }

  return (

    <div className="home">

      <div className="card">

        <h1>Edit Customer</h1>

        <form onSubmit={handleSave}>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
          />

          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
          />

          <input
            type="date"
            name="anniversary"
            value={form.anniversary}
            onChange={handleChange}
          />

          <button
            className="dashboard-btn"
            type="submit"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditCustomer;