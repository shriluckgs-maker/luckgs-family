import { useEffect, useState } from "react";
import "./register.css";
import {
  loadPlaces,
  savePlace,
  getFinalPlace,
} from "../services/placeService";

import { registerCustomer } from "../services/registrationService";
import { isValidIndianMobile, normalizeIndianMobile } from "../utils/mobileNumber";
import { useToast } from "../contexts/ToastContext";
import PageHeader from "../components/ui/PageHeader";
import LanguageToggle from "../components/LanguageToggle";
import { translate } from "../utils/i18n";

import {
  User,
  Phone,
  Cake,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";

function Register({ language, onLanguageChange, onSuccess, onBack }) {
  const t = (key, english) => language === "kn" ? translate(language, key) : english;
  const { showToast } = useToast();

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [places, setPlaces] = useState([]);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    birthday: "",
    birthdayDay: "",
    birthdayMonth: "",
    birthdayYear: "",
    gender: "",
    place: "",
    customPlace: "",
    marketingConsent: false,
  });

  useEffect(() => {
    loadPlaces().then(setPlaces);

    const input = document.getElementById("customerName");

    if (input) {
      input.focus();
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "mobile" ? normalizeIndianMobile(value) : value,
    }));
    setFormError("");
  }

  function handleBirthdayChange(part, value) {
    setForm((previous) => {
      const next = { ...previous, [part]: value };
      const { birthdayDay, birthdayMonth, birthdayYear } = next;
      next.birthday = birthdayDay && birthdayMonth && birthdayYear
        ? `${birthdayYear}-${String(birthdayMonth).padStart(2, "0")}-${String(birthdayDay).padStart(2, "0")}`
        : "";
      return next;
    });
  }
    

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    // Name Validation
    if (!form.name.trim()) {
      showToast({
        type: "error",
        title: t("missingName", "Missing Name"),
        message: t("enterFullName", "Please enter the customer's full name."),
      });
      return;
    }

    // Mobile Validation
    if (!isValidIndianMobile(form.mobile)) {
      showToast({
        type: "error",
        title: t("invalidMobile", "Invalid Mobile"),
        message: t("enterValidMobile", "Please enter a valid 10-digit mobile number."),
      });
      return;
    }

    // Birthday Validation
    if (!form.birthday) {
      showToast({
        type: "error",
        title: t("birthdayRequired", "Birthday Required"),
        message: t("selectBirthday", "Please select customer's birthday."),
      });
      return;
    }

    // Gender Validation
    if (!form.gender) {
      showToast({
        type: "error",
        title: t("genderRequired", "Gender Required"),
        message: t("selectGender", "Please select gender."),
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
        title: t("placeRequired", "Place Required"),
        message: t("selectOrEnterPlace", "Please select or enter customer's place."),
      });
      return;
    }

    setSaving(true);

    try {

      const finalPlace = getFinalPlace(form);

if (form.place === "OTHER") {
  await savePlace(finalPlace);
}

      const customer = await registerCustomer({ ...form, place: finalPlace });

      // Refresh place dropdown
      setPlaces(await loadPlaces());

      showToast({
        type: "success",
        title: t("registrationSuccessful", "Registration Successful"),
        message: `${customer.name}: ${t("spinForReward", "Spin the wheel to reveal their reward.")}`,
      });

      if (onSuccess) {
        onSuccess({
          ...customer,
        });
      }

      // Reset Form
      setForm({
        name: "",
        mobile: "",
        birthday: "",
        birthdayDay: "",
        birthdayMonth: "",
        birthdayYear: "",
        gender: "",
        place: "",
        customPlace: "",
        marketingConsent: false,
      });

    } catch (error) {

      console.error(error);

      if (error.code === "already-registered" || error.code === "permission-denied") {
        setFormError(t("alreadyRegistered", "You are already registered with LUCK-G'S Family Club using this mobile number."));
        showToast({
          type: "error",
          title: t("alreadyRegistered", "Already Registered"),
          message: t("alreadyRegistered", "This mobile number is already registered with LUCK-G'S Family Club."),
        });
        return;
      }

      if (error.code === "unavailable") {
        setFormError(t("checkConnection", "We could not verify this mobile number. Please check the internet connection and try again."));
        showToast({
          type: "error",
          title: t("connectionNeeded", "Connection Needed"),
          message: t("checkConnection", "Please check the internet connection before registering a customer."),
        });
        return;
      }

      showToast({
        type: "error",
        title: t("registrationFailed", "Registration Failed"),
        message: t("unableToSave", "Unable to save customer."),
      });

    } finally {

      setSaving(false);

    }
  }

  return (    <div className="register-page">
      <LanguageToggle language={language} onChange={onLanguageChange} />

      <div className="register-container">

        <PageHeader
          title={t("customerRegistration", "Customer Registration")}
          subtitle={t("joinClub", "Join the LUCK-G'S Family Club")}
          onBack={onBack}
        />

        <div className="register-card">

          <div className="form-title">

            <ShieldCheck size={28} />

            <div>
              <h2>{t("customerDetails", "Customer Details")}</h2>
              <p>
                {t("registerMinute", "Register a customer in less than one minute.")}
              </p>
            </div>

          </div>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {formError && <div className="registration-error" role="alert">{formError}</div>}

            <div className="form-grid">

              {/* Full Name */}

              <div className="form-group">

                <label>
                  <User size={16} />
                  {t("fullName", "Full Name")}
                </label>

                <input
                  id="customerName"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder={t("enterName", "Enter Customer Name")}
                  value={form.name}
                  onChange={handleChange}
                  onInput={handleChange}
                />

              </div>

              {/* Mobile */}

              <div className="form-group">

                <label>
                  <Phone size={16} />
                  {t("mobileNumber", "Mobile Number")}
                </label>

                <input
                  type="tel"
                  name="mobile"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength="16"
                  placeholder="9876543210"
                  value={form.mobile}
                  onChange={handleChange}
                />

              </div>

              {/* Birthday */}

              <div className="form-group">

                <label>
                  <Cake size={16} />
                  {t("birthday", "Birthday")}
                </label>

                <div className="dob-selects">
                  <select value={form.birthdayDay} onChange={(event) => handleBirthdayChange("birthdayDay", event.target.value)} aria-label="Birthday date">
                    <option value="">{t("date", "Date")}</option>
                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => <option key={day} value={day}>{day}</option>)}
                  </select>
                  <select value={form.birthdayMonth} onChange={(event) => handleBirthdayChange("birthdayMonth", event.target.value)} aria-label="Birthday month">
                    <option value="">{t("month", "Month")}</option>
                    {Array.from({ length: 12 }, (_, index) => (
                      new Intl.DateTimeFormat(language === "kn" ? "kn-IN" : "en-IN", { month: "long" })
                        .format(new Date(2020, index, 1))
                    )).map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                  </select>
                  <select value={form.birthdayYear} onChange={(event) => handleBirthdayChange("birthdayYear", event.target.value)} aria-label="Birthday year">
                    <option value="">{t("year", "Year")}</option>
                    {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map((year) => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>

              </div>
                            {/* Gender */}

              <div className="form-group">

                <label>
                  <Users size={16} />
                  {t("gender", "Gender")}
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
                    {t("male", "Male")}
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={handleChange}
                    />
                    {t("female", "Female")}
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={form.gender === "Other"}
                      onChange={handleChange}
                    />
                    {t("other", "Other")}
                  </label>

                </div>

              </div>

              {/* Place */}

              <div className="form-group">

                <label>
                  <MapPin size={16} />
                  {t("placeTown", "Place / Town")}
                </label>

                <select
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                >

                  <option value="">
                    {t("selectPlace", "Select Place")}
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
                    + {t("addPlace", "Add New Place")}
                  </option>

                </select>

                {form.place === "OTHER" && (

                  <input
                    type="text"
                    name="customPlace"
                    placeholder={t("enterPlace", "Enter New Place")}
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
                checked={form.marketingConsent}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  marketingConsent: event.target.checked,
                }))}
              />

              <label htmlFor="consent">
                {t("consent", "I agree to receive WhatsApp messages, birthday wishes and promotional offers from LUCK-G'S Family Club.")}
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
                    birthdayDay: "",
                    birthdayMonth: "",
                    birthdayYear: "",
                    gender: "",
                    place: "",
                    customPlace: "",
                    marketingConsent: false,
                  })
                }
              >
                {t("reset", "Reset")}
              </button>

              <button
                type="submit"
                className="primary-btn"
                disabled={saving}
              >
                {saving
                  ? t("registering", "Registering...")
                  : t("registerCustomer", "Register Customer")}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Register;
