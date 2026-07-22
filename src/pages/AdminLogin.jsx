import { useState } from "react";
import "./home.css";

function AdminLogin({ onLogin, onCancel }) {
  const [pin, setPin] = useState("");

  const handleLogin = () => {
    if (pin === "1234") {
      onLogin();
    } else {
      alert("Incorrect PIN");
      setPin("");
    }
  };

  return (
    <div className="home">
      <div className="card">

        <h1>🔒 Owner Login</h1>

        <p className="message">
          Enter your 4-digit PIN
        </p>

        <input
          type="password"
          maxLength={4}
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <button
          className="join-btn"
          onClick={handleLogin}
        >
          LOGIN
        </button>

        <button
          className="cancel-btn"
          onClick={onCancel}
        >
          CANCEL
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;