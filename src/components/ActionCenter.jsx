function ActionCenter({ stats }) {
  return (
    <div className="action-center">

      <h2>📋 Today's Priority</h2>

      <div className="action-card">
        <div>
          <h3>🎂 Birthday Wishes</h3>
          <p>
            {stats.birthdaysToday} customer(s) need birthday wishes today.
          </p>
        </div>

        <button className="action-button">
          OPEN
        </button>
      </div>

      <div className="action-card">
        <div>
          <h3>👥 Customer List</h3>
          <p>View and manage all registered customers.</p>
        </div>

        <button className="action-button">
          OPEN
        </button>
      </div>

      <div className="action-card">
        <div>
          <h3>📱 WhatsApp Campaign</h3>
          <p>Send promotional offers to your customers.</p>
        </div>

        <button className="action-button">
          START
        </button>
      </div>

      <div className="action-card">
        <div>
          <h3>🤖 AI Business Assistant</h3>
          <p>Get smart suggestions to increase repeat customers.</p>
        </div>

        <button className="action-button">
          VIEW
        </button>
      </div>

    </div>
  );
}

export default ActionCenter;