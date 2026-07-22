import "./pageHeader.css";
import { ArrowLeft } from "lucide-react";

function PageHeader({
  title,
  subtitle,
  onBack,
  action,
}) {
  return (
    <div className="page-header">

      <div className="page-header-left">

        {onBack && (
          <button
            className="page-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}

        <div>

          <h1>{title}</h1>

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>

      </div>

      {action && (
        <div className="page-header-action">
          {action}
        </div>
      )}

    </div>
  );
}

export default PageHeader;