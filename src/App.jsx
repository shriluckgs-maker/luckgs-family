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

function App() {
  const [page, setPage] = useState("home");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [currentCustomer, setCurrentCustomer] = useState(null);

  return (
    <>
      {page === "home" && (
        <Home
          onJoin={() => setPage("register")}
          onAdmin={() => setPage("adminLogin")}
        />
      )}

      {page === "register" && (
        <Register
          onSuccess={(customer) => {
            setCurrentCustomer(customer);
            setPage("success");
          }}
          onBack={() => setPage("home")}
        />
      )}

      {page === "success" && (
        <Success
          customer={currentCustomer}
          onLuckyRewards={() => setPage("luckyRewards")}
          onHome={() => setPage("home")}
        />
      )}

      {page === "luckyRewards" && (
        <LuckyRewards
          customer={currentCustomer}
          onBack={() => setPage("home")}
        />
      )}

      {page === "adminLogin" && (
        <AdminLogin
          onLogin={() => setPage("admin")}
          onCancel={() => setPage("home")}
        />
      )}

      {page === "admin" && (
        <Admin
          onCustomers={() => setPage("customers")}
          onBirthday={() => setPage("birthday")}
          onRewardPasses={() => setPage("rewardPasses")}
        />
      )}

      {page === "customers" && (
        <Customers
          onBack={() => setPage("admin")}
          onRegister={() => setPage("register")}
          onView={(id) => {
            setSelectedCustomer(id);
            setPage("profile");
          }}
        />
      )}

      {page === "profile" && (
        <CustomerProfile
          customerId={selectedCustomer}
          onBack={() => setPage("customers")}
          onEdit={(id) => {
            setSelectedCustomer(id);
            setPage("edit");
          }}
        />
      )}

      {page === "edit" && (
        <EditCustomer
          customerId={selectedCustomer}
          onBack={() => setPage("profile")}
        />
      )}

      {page === "birthday" && (
        <BirthdayCentre
          onBack={() => setPage("admin")}
        />
      )}

      {page === "rewardPasses" && (
        <RewardPasses
          onBack={() => setPage("admin")}
        />
      )}
    </>
  );
}

export default App;