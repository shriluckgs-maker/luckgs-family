import "./card.css";

function Card({
  children,
  title,
  subtitle,
  className = "",
}) {
  return (
    <div className={`ui-card ${className}`}>

      {(title || subtitle) && (
        <div className="ui-card-header">

          {title && (
            <h2>{title}</h2>
          )}

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>
      )}

      <div className="ui-card-body">
        {children}
      </div>

    </div>
  );
}

export default Card;