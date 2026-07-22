import { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Customers from "./pages/Customers";
import CustomerProfile from "./pages/CustomerProfile";
import EditCustomer from "./pages/EditCustomer";
import BirthdayCentre from "./pages/BirthdayCentre";

function App() {

  const [page, setPage] = useState("home");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
          onSuccess={() => setPage("success")}
        />
      )}

      {page === "success" && (
        <Success
          onHome={() => setPage("home")}
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
        />
      )}

      {page === "customers" && (
        <Customers
          onBack={() => setPage("admin")}
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

    </>
  );
}

export default App;