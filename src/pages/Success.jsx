import { useEffect } from "react";
import "./home.css";

function Success({ onHome }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onHome();
    }, 5000);

    return () => clearTimeout(timer);

  }, [onHome]);

  return (

    <div className="home">

      <div className="card">

        <div className="logo">
          ❤️
        </div>

        <h1>
          Welcome to the
          <br />
          LUCK-G'S Family
        </h1>

        <p className="message">

          Registration Successful

          <br /><br />

          Thank you for joining.

          <br />

          We look forward to serving you again.

        </p>

        <h2 style={{color:"#6B1525"}}>

          See you soon 👋

        </h2>

      </div>

    </div>

  );
}

export default Success;