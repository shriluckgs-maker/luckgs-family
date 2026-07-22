function QuickActions({
  onAddCustomer,
  onCustomers,
  onBirthday,
  onReports,
}) {
  return (
    <div className="quick-actions">

      <h2>⚡ Quick Actions</h2>

      <div className="quick-grid">

        <button
          className="quick-btn"
          onClick={onAddCustomer}
        >
          ➕
          <span>Add Customer</span>
        </button>

        <button
          className="quick-btn"
          onClick={onCustomers}
        >
          👥
          <span>Customers</span>
        </button>

        <button
          className="quick-btn"
          onClick={onBirthday}
        >
          🎂
          <span>Birthdays</span>
        </button>

        <button
          className="quick-btn"
          onClick={onReports}
        >
          📊
          <span>Reports</span>
        </button>

      </div>

    </div>
  );
}

export default QuickActions;