import "./style/notfound.css";
import logo from "./image/logo.png";  // Corrected import path

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={logo} alt="Logo" className="logo" />
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="back-home">Go Back to Home</a>
      </div>
    </div>
  );
}