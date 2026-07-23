import "./landing.css";
import logo from "../assets/logo.jpeg";

function Home({ onJoin, onAdmin }) {
  return (
    <div className="landing-page">

      <div className="landing-card">

        {/* Logo */}

        <img
          src={logo}
          alt="LUCK-G'S"
          className="landing-logo"
        />

        {/* Brand */}

        <h1 className="landing-title">
          LUCK-G'S
        </h1>

        <h2 className="landing-subtitle">
          FAMILY CLUB
        </h2>

        <p className="landing-message">
          Every Visit Matters.
          <br />
          Every Customer Is Family.
        </p>

        {/* Benefits */}

        <div className="benefits">

          <div className="benefit">
            <span>🎂</span>
            <p>Birthday Rewards</p>
          </div>

          <div className="benefit">
            <span>🎁</span>
            <p>Exclusive Family Offers</p>
          </div>

          <div className="benefit">
            <span>👔</span>
            <p>Early Access to New Arrivals</p>
          </div>

          <div className="benefit">
            <span>✨</span>
            <p>Festival Invitations</p>
          </div>

        </div>

        {/* Join */}

        <button
          className="join-button"
          onClick={onJoin}
        >
          JOIN THE LUCK-G'S FAMILY
        </button>

        <p className="landing-footer">
          Registration takes less than 30 seconds
        </p>

        {/* Owner Login */}

        <button
          className="owner-login"
          onClick={onAdmin}
        >
          Owner Login
        </button>

      </div>

    </div>
  );
}

export default Home;