import { useEffect, useState } from "react";
import "./register.css";
import {
  loadPlaces,
  savePlace,
  getFinalPlace,
} from "../services/placeService";

import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { useToast } from "../contexts/ToastContext";
import PageHeader from "../components/ui/PageHeader";

import {
  User,
  Phone,
  Cake,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";

function Register({ onSuccess, onBack }) {
  const { showToast } = useToast();

  const [saving, setSaving] = useState(false);

  const [places, setPlaces] = useState([]);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    birthday: "",
    gender: "",
    place: "",
    customPlace: "",
  });

  useEffect(() => {
    loadPlaces();

    const input = document.getElementById("customerName");

    if (input) {
      input.focus();
    }
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

    // Name Validation
    if (!form.name.trim()) {
      showToast({
        type: "error",
        title: "Missing Name",
        message: "Please enter the customer's full name.",
      });
      return;
    }

    // Mobile Validation
    if (!/^[0-9]{10}$/.test(form.mobile)) {
      showToast({
        type: "error",
        title: "Invalid Mobile",
        message: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    // Birthday Validation
    if (!form.birthday) {
      showToast({
        type: "error",
        title: "Birthday Required",
        message: "Please select customer's birthday.",
      });
      return;
    }

    // Gender Validation
    if (!form.gender) {
      showToast({
        type: "error",
        title: "Gender Required",
        message: "Please select gender.",
      });
      return;
    }

    // Place Validation
    if (
      !form.place ||
      (form.place === "OTHER" &&
        !form.customPlace.trim())
    ) {
      showToast({
        type: "error",
        title: "Place Required",
        message: "Please select or enter customer's place.",
      });
      return;
    }

    setSaving(true);

    try {

      const finalPlace = getFinalPlace(form);

if (form.place === "OTHER") {
  await savePlace(finalPlace);
}

      const customer = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        birthday: form.birthday,
        gender: form.gender,
        place: finalPlace,
        joinedOn: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, "customers"),
        customer
      );

      // Refresh place dropdown
      await loadPlaces();

      showToast({
        type: "success",
        title: "Registration Successful",
        message: `${customer.name} has been registered.`,
      });

      if (onSuccess) {
        onSuccess({
          id: docRef.id,
          ...customer,
        });
      }

      // Reset Form
      setForm({
        name: "",
        mobile: "",
        birthday: "",
        gender: "",
        place: "",
        customPlace: "",
      });

    } catch (error) {

      console.error(error);

      showToast({
        type: "error",
        title: "Registration Failed",
        message: "Unable to save customer.",
      });

    } finally {

      setSaving(false);

    }
  }

  return (    <div className="register-page">

      <div className="register-container">

        <PageHeader
          title="Customer Registration"
          subtitle="Join the LUCK-G'S Family Club"
          onBack={onBack}
        />

        <div className="register-card">

          <div className="form-title">

            <ShieldCheck size={28} />

            <div>
              <h2>Customer Details</h2>
              <p>
                Register a customer in less than one minute.
              </p>
            </div>

          </div>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              {/* Full Name */}

              <div className="form-group">

                <label>
                  <User size={16} />
                  Full Name
                </label>

                <input
                  id="customerName"
                  type="text"
                  name="name"
                  placeholder="Enter Customer Name"
                  value={form.name}
                  onChange={handleChange}
                />

              </div>

              {/* Mobile */}

              <div className="form-group">

                <label>
                  <Phone size={16} />
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  maxLength="10"
                  placeholder="9876543210"
                  value={form.mobile}
                  onChange={handleChange}
                />

              </div>

              {/* Birthday */}

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
                            {/* Gender */}

              <div className="form-group">

                <label>
                  <Users size={16} />
                  Gender
                </label>

                <div className="gender-options">

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={form.gender === "Male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={form.gender === "Other"}
                      onChange={handleChange}
                    />
                    Other
                  </label>

                </div>

              </div>

              {/* Place */}

              <div className="form-group">

                <label>
                  <MapPin size={16} />
                  Place / Town
                </label>

                <select
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Place
                  </option>

                  {places.map((place) => (
                    <option
                      key={place}
                      value={place}
                    >
                      {place}
                    </option>
                  ))}

                  <option value="OTHER">
                    ➕ Add New Place
                  </option>

                </select>

                {form.place === "OTHER" && (

                  <input
                    type="text"
                    name="customPlace"
                    placeholder="Enter New Place"
                    value={form.customPlace}
                    onChange={handleChange}
                  />

                )}

              </div>

            </div>

            {/* Consent */}

            <div className="consent-box">

              <input
                id="consent"
                type="checkbox"
                required
              />

              <label htmlFor="consent">
                I agree to receive WhatsApp messages,
                birthday wishes and promotional offers
                from LUCK-G'S Family Club.
              </label>

            </div>
                        {/* Buttons */}

            <div className="button-row">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setForm({
                    name: "",
                    mobile: "",
                    birthday: "",
                    gender: "",
                    place: "",
                    customPlace: "",
                  })
                }
              >
                Reset
              </button>

              <button
                type="submit"
                className="primary-btn"
                disabled={saving}
              >
                {saving
                  ? "Registering..."
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