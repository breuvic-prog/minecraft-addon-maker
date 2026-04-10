import "./SiteHeader.css";
import axios from "axios";

const SiteHeader = ({ user, setUser }) => {
  // Handles the login process
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: "test@example.com",
        password: "password123",
      });

      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="header">
      <button className="logo-button">
        <img src="/logo.png" alt="MC Addon Maker Logo" className="logo" />
        MC Addon Maker
      </button>

      <nav className="nav-bar">
        <button className="nav-bar-button">My Addons</button>
        <button className="button nav-bar-button">Create Addon</button>
        <button className="button nav-bar-button">Help</button>
      </nav>

      <div className="signup-login-frame">
        {user ? (
          <button
            className="button signup-login-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="button signup-login-button"
              onClick={handleLogin}
            >
              Login
            </button>
            <button className="button signup-login-button">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;