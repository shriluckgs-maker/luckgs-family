import { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import LuckyRewards from "./pages/LuckyRewards";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Customers from "./pages/Customers";
import CustomerProfile from "./pages/CustomerProfile";
import EditCustomer from "./pages/EditCustomer";
import BirthdayCentre from "./pages/BirthdayCentre";
import RewardPasses from "./pages/RewardPasses";
import RewardManagement from "./pages/RewardManagement";
import RegistrationQr from "./pages/RegistrationQr";

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("luckgs-language") || "en");
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("owner") === "1") return "adminLogin";
    if (params.get("register") === "1") return "register";
    return "home";
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const changeLanguage = (nextLanguage) => {
    localStorage.setItem("luckgs-language", nextLanguage);
    setLanguage(nextLanguage);
  };

  return (
    <>
      {page === "home" && <Home language={language} onLanguageChange={changeLanguage} onJoin={() => setPage("register")} onShowQr={() => setPage("registrationQr")} />}
      {page === "registrationQr" && <RegistrationQr onBack={() => setPage("home")} />}
      {page === "register" && <Register language={language} onLanguageChange={changeLanguage} onSuccess={(customer) => { setCurrentCustomer(customer); setPage("success"); }} onBack={() => setPage("home")} />}
      {page === "success" && <Success language={language} onLanguageChange={changeLanguage} customer={currentCustomer} onLuckyRewards={() => setPage("luckyRewards")} onHome={() => setPage("home")} />}
      {page === "luckyRewards" && <LuckyRewards language={language} onLanguageChange={changeLanguage} customer={currentCustomer} onBack={() => setPage("home")} />}
      {page === "adminLogin" && <AdminLogin onLogin={() => setPage("admin")} onCancel={() => setPage("home")} />}
      {page === "admin" && <Admin onCustomers={() => setPage("customers")} onBirthday={() => setPage("birthday")} onRewardPasses={() => setPage("rewardPasses")} onManageRewards={() => setPage("manageRewards")} onRegister={() => setPage("register")} />}
      {page === "customers" && <Customers onBack={() => setPage("admin")} onRegister={() => setPage("register")} onView={(id) => { setSelectedCustomer(id); setPage("profile"); }} />}
      {page === "profile" && <CustomerProfile customerId={selectedCustomer} onBack={() => setPage("customers")} onEdit={(id) => { setSelectedCustomer(id); setPage("edit"); }} />}
      {page === "edit" && <EditCustomer customerId={selectedCustomer} onBack={() => setPage("profile")} />}
      {page === "birthday" && <BirthdayCentre onBack={() => setPage("admin")} />}
      {page === "rewardPasses" && <RewardPasses onBack={() => setPage("admin")} />}
      {page === "manageRewards" && <RewardManagement onBack={() => setPage("admin")} />}
    </>
  );
}

export default App;
