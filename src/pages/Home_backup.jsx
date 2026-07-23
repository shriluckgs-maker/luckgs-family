import "./home.css";

function Home({ onJoin, onAdmin }) {
  return (
    <div className="home">
      <div className="card">

        <div
          className="logo"
          onDoubleClick={onAdmin}
          title="Owner Login"
          style={{ cursor: "pointer" }}
        >
          ❤️
        </div>

        <h1>LUCK-G'S Family</h1>

        <p className="message">
          Every visit matters.
          <br />
          Every customer is family.
        </p>

        <div className="benefits">

          <div className="benefit-card">
            🎂 Birthday Surprises
          </div>

          <div className="benefit-card">
            🎁 Exclusive Family Offers
          </div>

          <div className="benefit-card">
            👔 Early Access to New Arrivals
          </div>

          <div className="benefit-card">
            ✨ Festival Invitations
          </div>

        </div>

        <button
          className="join-btn"
          onClick={onJoin}
        >
          JOIN THE LUCK-G'S FAMILY
        </button>

        <p className="footer">
          Registration takes less than 30 seconds
        </p>

      </div>
    </div>
  );
}

export default Home;