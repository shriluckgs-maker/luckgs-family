import { useState } from "react";
import "./home.css";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Register({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    birthday: "",
    anniversary: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.birthday) {
      onSuccess();
      return;
    }

    try {
      await addDoc(collection(db, "customers"), {
        name: form.name,
        mobile: form.mobile,
        birthday: form.birthday,
        anniversary: form.anniversary,
        joinedOn: new Date().toISOString(),
      });

      alert("🎉 Welcome to the LUCK-G'S Family!");

      setForm({
        name: "",
        mobile: "",
        birthday: "",
        anniversary: "",
      });

    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Unable to save customer.");
    }
  };

  return (
    <div className="home">

      <div className="card">

        <h1>❤️ Join the LUCK-G'S Family</h1>

        <p className="message">
          Registration takes less than 30 seconds.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="📱 Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <label>🎂 Birthday</label>

          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
            required
          />

          <label>💍 Anniversary (Optional)</label>

          <input
            type="date"
            name="anniversary"
            value={form.anniversary}
            onChange={handleChange}
          />

          <div
            style={{
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="checkbox"
              required
              style={{
                width: "18px",
                marginRight: "10px",
              }}
            />

            I agree to receive WhatsApp updates and exclusive offers from
            LUCK-G'S.
          </div>

          <button className="join-btn" type="submit">
            JOIN THE LUCK-G'S FAMILY
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;