import "./emptyState.css";

function EmptyState({
  icon = "📂",
  title = "Nothing Here Yet",
  message = "There is currently no data to display.",
  action = null,
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      {action && (
        <div className="empty-action">
          {action}
        </div>
      )}

    </div>
  );
}

export default EmptyState;