import "./loader.css";

function Loader({
  text = "Loading...",
  size = "medium",
}) {
  return (
    <div className={`loader-container ${size}`}>

      <div className="loader-spinner"></div>

      <p>{text}</p>

    </div>
  );
}

export default Loader;