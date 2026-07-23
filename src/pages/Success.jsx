import { useEffect } from "react";
import "./home.css";

function Success({ customer, onLuckyRewards }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLuckyRewards) {
        onLuckyRewards();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLuckyRewards]);

  return (
    <div className="home">
      <div className="card">

        <div
          className="logo"
          style={{ fontSize: "70px" }}
        >
          🎉
        </div>

        <h1>
          Welcome to the
          <br />
          LUCK-G'S Family Club
        </h1>

        <h2
          style={{
            color: "#6B1525",
            marginTop: "20px",
          }}
        >
          {customer?.name || "Member"}
        </h2>

        <p
          className="message"
          style={{ marginTop: "20px" }}
        >
          Registration Successful!
          <br />
          <br />
          Thank you for joining the
          <strong> LUCK-G'S Family Club.</strong>
          <br />
          <br />
          Your exclusive
          <strong> Lucky Reward </strong>
          is being prepared...
        </p>

        <div
          style={{
            marginTop: "30px",
            fontSize: "40px",
          }}
        >
          🎁🎡✨
        </div>

        <p
          style={{
            marginTop: "20px",
            color: "#777",
            fontWeight: "600",
          }}
        >
          Please wait...
        </p>

      </div>
    </div>
  );
}

export default Success;