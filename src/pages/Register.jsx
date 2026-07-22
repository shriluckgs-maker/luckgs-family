import { useEffect, useState } from "react";
import "./register.css";
import { useToast } from "../contexts/ToastContext";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import {
  User,
  Phone,
  Cake,
  Heart,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Register({ onSuccess, onBack }) {

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    birthday: "",
    anniversary: "",
  });

  const [saving, setSaving] = useState(false);
const { showToast } = useToast();
  useEffect(() => {

    const input = document.getElementById("customerName");

    if (input) input.focus();

  }, []);

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!form.name.trim()) {
      showToast({
  type: "error",
  title: "Missing Name",
  message: "Please enter the customer's full name.",
    });
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      showToast({
  type: "error",
  title: "Invalid Mobile Number",
  message: "Please enter a valid 10-digit mobile number.",
});
return;
    }

    if (!form.birthday) {
      showToast({
  type: "error",
  title: "Birthday Required",
  message: "Please select the customer's birthday.",
});
return;
    }

    setSaving(true);

    try {

      await addDoc(collection(db, "customers"), {
        name: form.name.trim(),
        mobile: form.mobile,
        birthday: form.birthday,
        anniversary: form.anniversary,
        joinedOn: new Date().toISOString(),
      });

      showToast({
  type: "success",
  title: "Customer Registered",
  message: `${form.name} has been added successfully.`,
});

      setForm({
        name: "",
        mobile: "",
        birthday: "",
        anniversary: "",
      });
      setTimeout(() => {

      if (onSuccess) {
        onSuccess();
      }
      }, 1500);

    } catch (error) {

      console.error(error);

      showToast({
  type: "error",
  title: "Registration Failed",
  message: "Unable to save customer. Please try again.",
});

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="register-page">

      <div className="register-container">

        <div className="register-header">

          <button
            className="back-btn"
            onClick={onBack}
          >

            <ArrowLeft size={18} />

            Dashboard

          </button>

        <PageHeader
    title="Customer Registration"
    subtitle="Register a new customer into LUCK-G'S AI."
    onBack={onBack}
/>

        </div>

        <div className="register-card">

          <div className="form-title">

            <ShieldCheck size={26} />

            <div>

              <h2>Customer Details</h2>

              <span>
                Registration takes less than one minute.
              </span>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >
            
                <div className="form-grid">

              <div className="form-group">

                <label>

                  <User size={16} />

                  Full Name

                </label>

                <input
                  id="customerName"
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="off"
                />

              </div>

              <div className="form-group">

                <label>

                  <Phone size={16} />

                  Mobile Number

                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="9876543210"
                  maxLength="10"
                  value={form.mobile}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>

                  <Cake size={16} />

                  Birthday

                </label>

                <input
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>

                  <Heart size={16} />

                  Anniversary

                </label>

                <input
                  type="date"
                  name="anniversary"
                  value={form.anniversary}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="consent-box">

              <input
                type="checkbox"
                required
              />

              <span>

                I agree to receive WhatsApp updates,
                birthday wishes and promotional offers
                from LUCK-G'S.

              </span>

            </div>

            <div className="button-row">

              <button
                type="reset"
                variant="secondary"
                onClick={() =>
                  setForm({
                    name: "",
                    mobile: "",
                    birthday: "",
                    anniversary: "",
                  })
                }
              >

                Reset

              </button>

              <button
                type="submit"
                variant="primary"
                disabled={saving}
              >

                {saving
                  ? "Saving..."
                  : "Register Customer"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Register;
